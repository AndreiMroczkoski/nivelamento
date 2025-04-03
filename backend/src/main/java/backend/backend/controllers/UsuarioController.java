package backend.backend.controllers;

import backend.backend.models.entities.Usuario;
import backend.backend.models.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/usuario")

public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Usuario usuario) {

        var retornoSalvarUsuario = usuarioRepository.save(usuario);

        return ResponseEntity.ok(retornoSalvarUsuario);
    }


    @GetMapping
    public List<Usuario> listar() {

        return usuarioRepository.findAll();
    }

    @GetMapping("{id}")
    public Usuario listarPorId(@PathVariable Long id) {

        var retornoListarUsuarioPorId= usuarioRepository.findById(id).get();

        return retornoListarUsuarioPorId;
    }

    @PutMapping
    public ResponseEntity<?> editar(@RequestBody Usuario usuario) {


        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public List<Usuario> deletar(@PathVariable Long id) {


        return new ArrayList<>();
    }








}
