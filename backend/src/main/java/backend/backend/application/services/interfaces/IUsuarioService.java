package backend.backend.application.services.interfaces;

import backend.backend.application.object.usuario.UsuarioListarResponse;
import backend.backend.application.object.usuario.UsuarioSalvarRequest;
import backend.backend.domain.entities.Usuario;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUsuarioService {

    Usuario UsuarioLogado();

    Usuario SalvarUsuario(UsuarioSalvarRequest usuario);
    List<UsuarioListarResponse> ListarUsuario();

    ResponseEntity<String> deletarUsuario(Long id);
}
