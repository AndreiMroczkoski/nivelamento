package backend.backend.domain.repository;
import backend.backend.domain.entities.Movimentacoes;
import backend.backend.domain.entities.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovimentacaoRepository extends JpaRepository<Movimentacoes, Long> {

    List<Movimentacoes> findAllByOrderByDataHoraMovimentacaoDesc();

    List<Movimentacoes> findByProduto(Produto produto);

    List<Movimentacoes> findByProdutoId(Long produtoId);


}