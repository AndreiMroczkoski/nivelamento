package backend.backend.presentation.controllers;

import backend.backend.application.object.usuario.UsuarioListarResponse;
import backend.backend.application.object.usuario.UsuarioSalvarRequest;
import backend.backend.application.services.UsuarioService;
import backend.backend.application.services.interfaces.IUsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
@Tag(name = "Usuários", description = "Endereço responsável pelo controle de usuários")
public class UsuarioController {


    @Autowired
    private IUsuarioService usuarioService;


    @PostMapping
    @Operation(summary = "Salvar usuário", description = "Método responsável por salvar usuário")
    public ResponseEntity<?> salvar(@RequestBody UsuarioSalvarRequest usuario) {

        var retornoSalvarUsuario = usuarioService.SalvarUsuario(usuario);

        return ResponseEntity.ok(retornoSalvarUsuario);
    }


    @GetMapping("/listar")
    @Operation(summary = "Listar usuário", description = "Método responsável por listar usuário")
    public List<UsuarioListarResponse> listar() {


        return usuarioService.ListarUsuario();
    }
/*
    @GetMapping
    @Operation(summary = "Listar usuário por Id",description = "Método responsável por listar usuário por Id")
    public Usuario listarPorId() {

        var usuarioLogado = usuarioService.UsuarioLogado();
        var retornoListarUsuarioPorId = usuarioRepository.findById(usuarioLogado.getId()).get();
        return retornoListarUsuarioPorId;
    }

    @PutMapping
    @Operation(summary = "Editar usuário",description = "Método responsável por editar usuário")
    public ResponseEntity<?> editar(@RequestBody Usuario usuario) {


        return ResponseEntity.ok().build();
    }*/

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar usuário", description = "Método responsável por Deletar usuário")
    public ResponseEntity<?> deletar(@PathVariable Long id) {

        try {
            // falta fazer a regra
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());

        }

    }


}
