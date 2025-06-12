package backend.backend.application.services.interfaces;
import backend.backend.application.object.movimentacao.MovimentacaoRequest;
import backend.backend.application.object.movimentacao.MovimentacaoResponse;

import java.util.List;


public interface IMovimentacaoService {


    MovimentacaoResponse registrarMovimentacao(MovimentacaoRequest request);
    MovimentacaoResponse buscarPorId(Long id);
    List<MovimentacaoResponse> listar();
    List<MovimentacaoResponse> listarMovimentacoesPorProduto(Long produtoId);

}