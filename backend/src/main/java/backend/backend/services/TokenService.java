package backend.backend.services;

import backend.backend.object.LoginRequest;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.diagnostics.LoggingFailureAnalysisReporter;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.concurrent.ExecutionException;

@Service
public class TokenService {


    @Value("${spring.expiration_time}")
    private Long expirationTime;

    @Value("${spring.secretkey}")
    private String secret;

    @Value("${spring.emissor}")
    private String emissor;



    public String gerarToken(LoginRequest loginRequest) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            String token = JWT.create()
                    .withIssuer(emissor)
                    .withSubject(loginRequest.usuario())
                    .withExpiresAt(this.gerarDataExpicaracao())
                    .sign(algorithm);

            return token;
        } catch (Exception e) {
            return null;
        }
    }


    public DecodedJWT validarToken(String token) {

        Algorithm algorithm = Algorithm.HMAC256(secret);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(emissor).build();

        return verifier.verify(token);

    }

    private Instant gerarDataExpicaracao() {
        return LocalDateTime.now()
                .plusMinutes(expirationTime)
                .toInstant(ZoneOffset.of("-03:00"));
    }

}
