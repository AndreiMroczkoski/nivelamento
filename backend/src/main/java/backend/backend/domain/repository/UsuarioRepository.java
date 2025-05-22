package backend.backend.domain.repository;

import backend.backend.domain.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUsuarioAndSenha(String usuario, String senha);

    Optional<Usuario> findByUsuario(String usuario);
}
