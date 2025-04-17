package backend.backend.domain.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Produto")
public class Produto {

    public Produto(){}

    public Produto(String nome, Usuario usuario){
        this.usuario = usuario;
        this.nome = nome;
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

