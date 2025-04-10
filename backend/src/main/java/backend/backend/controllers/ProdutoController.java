package backend.backend.controllers;


import backend.backend.models.entities.Produto;
import backend.backend.models.entities.Usuario;
import backend.backend.models.repository.ProdutoRepository;
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


    @PostMapping
    @Operation(summary = "Salvar Produto", description = "Método responsável por salvar produto")
    public ResponseEntity<?> salvar(@RequestBody Produto produto) {

        var retornoSalvarProduto = produtoRepository.save(produto);

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
