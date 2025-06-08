package backend.backend.application.services;


import backend.backend.application.object.LoginRequest;
import backend.backend.application.object.usuario.UsuarioListarResponse;
import backend.backend.application.object.usuario.UsuarioSalvarRequest;
import backend.backend.application.services.interfaces.IUsuarioService;
import backend.backend.domain.entities.Usuario;
import backend.backend.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public Usuario UsuarioLogado() {
        var auth = SecurityContextHolder. getContext().getAuthentication();
        return usuarioRepository.findByUsuario(auth.getName()).orElse(null);
    }

    public Usuario ValidarUsuario(LoginRequest loginRequest) {
        var usuario = usuarioRepository.findByUsuarioAndSenha(loginRequest.usuario(),loginRequest.senha()).orElse(null);
        if (usuario != null) {
            return usuario;
        } else {
            return null;
        }
    }

    @Override
    public Usuario SalvarUsuario(UsuarioSalvarRequest usuario) {

        var lResult = usuarioRepository.save(new Usuario(usuario));

        return lResult;
    }


    public ResponseEntity<String> deletarUsuario(Long id) {
        try {

            usuarioRepository.deleteById(id);

            return ResponseEntity.ok().build();

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public List<UsuarioListarResponse> ListarUsuario() {

        var lResult = usuarioRepository.findAll().stream()
                .map(usuario -> new UsuarioListarResponse(
                        usuario.getId(),
                        usuario.getUsuario(),
                        usuario.getCep(),
                        usuario.getLogradouro(),
                        usuario.getBairro(),
                        usuario.getCidade(),
                        usuario.getEstado()
                ))
                .toList();
        return lResult;
    }
}



