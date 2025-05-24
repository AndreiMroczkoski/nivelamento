package backend.backend.presentation.controllers;


import backend.backend.application.object.produto.ProdutoListarResponse;
import backend.backend.application.object.produto.ProdutoSalvarRequest;
import backend.backend.application.services.ProdutoService;
import backend.backend.application.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produto")
@Tag(name = "Produto", description = "Endereço responsável pelo controle de produtos")
public class ProdutoController {


    @Autowired
    private ProdutoService produtoService;


    @PostMapping("/salvar")
    @Operation(summary = "Salvar produto", description = "Método responsável por salvar produto")
    public ResponseEntity<?> salvar(@RequestBody ProdutoSalvarRequest produto) {

        var retornoSalvarProduto = produtoService.SalvarProduto(produto);

        return ResponseEntity.ok(retornoSalvarProduto);
    }

    @GetMapping("/listar")
    @Operation(summary = "Listar produto", description = "Método responsável por listar produto")
    public List<ProdutoListarResponse> listar() {

        return produtoService.ListarProduto();
    }

    @DeleteMapping("/deletar/{id}")
    @Operation(summary = "Deletar Produto", description = "Método responsável por deletar produto")
    public ResponseEntity<?> deletar(@PathVariable Long id) {

        try {
            return produtoService.deletarProduto(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao deletar produto: " + e.getMessage());
        }

    }
}
