package backend.backend.controllers;

import backend.backend.models.entities.Usuario;
import backend.backend.models.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/usuario")
@Tag(name="Usuários",description = "Endereço responsável pelo controle de usuários")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    @Operation(summary = "Salvar usuário",description = "Método responsável por salvar usuário")
    public ResponseEntity<?> salvar(@RequestBody Usuario usuario) {

        var retornoSalvarUsuario = usuarioRepository.save(usuario);

        return ResponseEntity.ok(retornoSalvarUsuario);
    }


    @GetMapping
    @Operation(summary = "Listar usuário",description = "Método responsável por listar usuário")
    public List<Usuario> listar() {

        return usuarioRepository.findAll();
    }

    @GetMapping("{id}")
    @Operation(summary = "Listar usuário por Id",description = "Método responsável por listar usuário por Id")
    public Usuario listarPorId(@PathVariable Long id) {

        var retornoListarUsuarioPorId = usuarioRepository.findById(id).get();

        return retornoListarUsuarioPorId;
    }

    @PutMapping
    @Operation(summary = "Editar usuário",description = "Método responsável por editar usuário")
    public ResponseEntity<?> editar(@RequestBody Usuario usuario) {


        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar usuário",description = "Método responsável por Deletar usuário")
    public ResponseEntity<?> deletar(@PathVariable Long id) {

       usuarioRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }


}
