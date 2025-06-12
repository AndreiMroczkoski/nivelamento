package backend.backend.application.object.movimentacao;

import backend.backend.domain.entities.TipoMovimentacao;

import java.time.LocalDateTime;

public record MovimentacaoResponse(Long id, String produtoNome, Long produtoId, Long quantidadeMovimentada,
                                   TipoMovimentacao tipo, LocalDateTime dataHoraMovimentacao, String usuarioNome, Long usuarioId) {

}
