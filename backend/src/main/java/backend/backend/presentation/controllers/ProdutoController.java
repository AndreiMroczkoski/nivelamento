package backend.backend.presentation.controllers;


import backend.backend.application.object.ProdutoRequest;
import backend.backend.domain.entities.Produto;
import backend.backend.domain.repository.ProdutoRepository;
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
    private ProdutoRepository produtoRepository;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    @Operation(summary = "Salvar Produto", description = "Método responsável por salvar produto")
    public ResponseEntity<?> salvar(@RequestBody ProdutoRequest produto) {

        var usuarioLogado = usuarioService.UsuarioLogado();
        var produtoSave = new Produto(produto.nome(),usuarioLogado);


        var retornoSalvarProduto = produtoRepository.save(produtoSave);

        return ResponseEntity.ok(retornoSalvarProduto);
    }

    @GetMapping
    @Operation(summary = "Listar Produto", description = "Método responsável por listar produto")
    public List<Produto> listar() {

        return produtoRepository.findAll();
    }

    @GetMapping("{id}")
    @Operation(summary = "Listar Produto por Id", description = "Método responsável por listar produto por Id")
    public Produto listarPorId(@PathVariable Long id) {

        var retornoListarProdutoPorId = produtoRepository.findById(id).get();

        return retornoListarProdutoPorId;
    }


    @PutMapping
    @Operation(summary = "Editar Produto", description = "Método responsável por editar produto")
    public ResponseEntity<?> editar(@RequestBody Produto produto) {


        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar Produto", description = "Método responsável por deletar produto")
    public ResponseEntity<?> deletar(@PathVariable Long id) {

        produtoRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }


}
