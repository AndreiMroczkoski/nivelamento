package backend.backend.services;


import backend.backend.models.entities.Usuario;
import backend.backend.models.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;
    public Usuario UsuarioLogado() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        return usuarioRepository.findByUsuario(auth.getName()).orElse(null);
    }
}
