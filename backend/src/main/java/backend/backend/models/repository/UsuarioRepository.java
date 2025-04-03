package backend.backend.models.repository;

import backend.backend.models.entities.Usuario;
import com.sun.jdi.LongValue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
