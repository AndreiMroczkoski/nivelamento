package backend.backend.application.object.movimentacao;


import backend.backend.domain.entities.TipoMovimentacao;

public record MovimentacaoRequest(Long produtoId, Long quantidadeMovimentada,TipoMovimentacao tipo){
}