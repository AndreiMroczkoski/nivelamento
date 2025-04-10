package backend.backend.configuration;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

    @Bean
    public OpenAPI custonOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("Nivelamento")
                .version("1.0")
                .description("Documentação da API")
        );
    }
}
