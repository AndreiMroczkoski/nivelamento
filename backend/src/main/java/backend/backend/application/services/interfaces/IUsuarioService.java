package backend.backend.application.services.interfaces;

import backend.backend.application.object.usuario.UsuarioSalvarRequest;
import backend.backend.domain.entities.Usuario;

public interface IUsuarioService {

    Usuario UsuarioLogado();

    Usuario SalvarUsuario(UsuarioSalvarRequest usuario);
}
