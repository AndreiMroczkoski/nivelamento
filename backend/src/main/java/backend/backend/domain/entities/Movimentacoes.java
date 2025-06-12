package backend.backend.domain.entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity

@Table(name = "Movimentacoes")
public class Movimentacoes {

    public Movimentacoes() {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    private Long quantidadeMovimentada;

    @Enumerated(EnumType.STRING)
    private TipoMovimentacao tipo;


    private LocalDateTime dataHoraMovimentacao;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;


}