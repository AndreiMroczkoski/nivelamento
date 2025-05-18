package backend.backend.application.services;


import backend.backend.application.object.usuario.UsuarioListarResponse;
import backend.backend.application.object.usuario.UsuarioSalvarRequest;
import backend.backend.application.services.interfaces.IUsuarioService;
import backend.backend.domain.entities.Usuario;
import backend.backend.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public Usuario UsuarioLogado() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        return usuarioRepository.findByUsuario(auth.getName()).orElse(null);
    }

    @Override
    public Usuario SalvarUsuario(UsuarioSalvarRequest usuario) {

        var lResult = usuarioRepository.save(new Usuario(usuario));

        return lResult;
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



