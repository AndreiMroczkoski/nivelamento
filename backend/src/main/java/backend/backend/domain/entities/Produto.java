package backend.backend.domain.entities;


import backend.backend.application.object.produto.ProdutoSalvarRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Produto")
public class Produto {

    public Produto() {}


    public Produto(ProdutoSalvarRequest produto) {
        this.nome = produto.nome();
        this.categoria = produto.categoria();
        this.preco = produto.preco();
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long Id;

    private String nome;

    private Double preco;

    private String categoria;

    private Long quantidade;

    @ManyToOne
    private Usuario usuario;

    }

