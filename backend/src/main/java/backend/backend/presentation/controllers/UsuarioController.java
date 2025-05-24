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


    @PostMapping("/salvar")
    @Operation(summary = "Salvar usuário", description = "Método responsável por salvar usuário")
    public ResponseEntity<?> salvar(@RequestBody UsuarioSalvarRequest usuario) {
        try {
        var retornoSalvarUsuario = usuarioService.SalvarUsuario(usuario);

        return ResponseEntity.ok(retornoSalvarUsuario);
    } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao salvar usuário: " + e.getMessage());
        }
    }


    @GetMapping("/listar")
    @Operation(summary = "Listar usuário", description = "Método responsável por listar usuário")
    public List<UsuarioListarResponse> listar() {


        return usuarioService.ListarUsuario();
    }

    @DeleteMapping("/deletar/{id}")
    @Operation(summary = "Deletar usuário", description = "Método responsável por Deletar um usuário pelo seu ID.")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            usuarioService.deletarUsuario(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao deletar usuário: " + e.getMessage());
        }
    }
}
