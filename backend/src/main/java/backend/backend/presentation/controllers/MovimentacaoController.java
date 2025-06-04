package backend.backend.presentation.controllers;

import backend.backend.application.object.movimentacao.MovimentacaoRequest;
import backend.backend.application.object.movimentacao.MovimentacaoResponse;
import backend.backend.application.services.interfaces.IMovimentacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movimentacoes")
@Tag(name = "Movimentações", description = "Responsável pelo controle de movimentações de produtos")
public class MovimentacaoController {

    @Autowired
    private IMovimentacaoService movimentacaoService;

    @PostMapping("/registrar")
    @Operation(summary = "Registrar Movimentação", description = "Método responsável por registrar uma nova movimentação de produto (entrada ou saída)")
    public ResponseEntity<?> registrarMovimentacao(@Valid @RequestBody MovimentacaoRequest request) {
        try {
            MovimentacaoResponse response = movimentacaoService.registrarMovimentacao(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao registrar movimentação: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    @Operation(summary = "Listar Todas as Movimentações", description = "Método responsável por listar todas as movimentações de produtos")
    public ResponseEntity<?> listarTodasMovimentacoes() {
        try {
            List<MovimentacaoResponse> responses = movimentacaoService.listar();
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao listar movimentações: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar Movimentação por ID", description = "Método responsável por buscar uma movimentação específica pelo seu ID")
    public ResponseEntity<?> buscarMovimentacaoPorId(@PathVariable Long id) {
        try {
            MovimentacaoResponse response = movimentacaoService.buscarPorId(id);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao buscar movimentação por ID: " + e.getMessage());

        }
    }

    @GetMapping("/produto/{produtoId}")
    @Operation(summary = "Listar Movimentações por Produto", description = "Método responsável por listar todas as movimentações de um produto específico")
    public ResponseEntity<?> listarMovimentacoesPorProduto(@PathVariable Long produtoId) {
        try {
            List<MovimentacaoResponse> responses = movimentacaoService.listarMovimentacoesPorProduto(produtoId);
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao listar movimentações por produto: " + e.getMessage());
        }
    }
}