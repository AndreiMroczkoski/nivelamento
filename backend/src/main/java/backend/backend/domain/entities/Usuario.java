package backend.backend.domain.entities;

import backend.backend.application.object.usuario.UsuarioSalvarRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "Usuario")
@Getter
@Setter
public class Usuario {


    public Usuario(){}

    public Usuario(UsuarioSalvarRequest usuario) {
        this.id = usuario.id();
        this.usuario = usuario.usuario();
        this.senha = usuario.senha();
        this.cep = usuario.cep();
        this.logradouro = usuario.logradouro();
        this.bairro = usuario.bairro();
        this.cidade = usuario.cidade();
        this.estado = usuario.estado();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String usuario;
    private String senha;
    private Long cep;
    private String logradouro;
    private String bairro;
    private String cidade;
    private String estado;

}
