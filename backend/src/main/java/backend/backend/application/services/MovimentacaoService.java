package backend.backend.application.services;

import backend.backend.application.object.movimentacao.MovimentacaoRequest;
import backend.backend.application.object.movimentacao.MovimentacaoResponse;
import backend.backend.application.services.interfaces.IMovimentacaoService;
import backend.backend.domain.entities.Movimentacoes;
import backend.backend.domain.entities.Produto;
import backend.backend.domain.entities.TipoMovimentacao;
import backend.backend.domain.entities.Usuario;
import backend.backend.domain.repository.MovimentacaoRepository;
import backend.backend.domain.repository.ProdutoRepository;
import backend.backend.domain.repository.UsuarioRepository;
import backend.backend.application.services.interfaces.IMovimentacaoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovimentacaoService implements IMovimentacaoService {

    @Autowired
    MovimentacaoRepository movimentacaoRepository;
    @Autowired
    ProdutoRepository produtoRepository;
    @Autowired
    UsuarioRepository usuarioRepository;


    @Override
    public MovimentacaoResponse registrarMovimentacao(MovimentacaoRequest request) {
        Produto produto = produtoRepository.findById(request.produtoId())
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com ID: " + request.produtoId()));

        Usuario usuario = usuarioRepository.findById(request.usuarioId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + request.usuarioId()));


        if (request.quantidadeMovimentada() == null || request.quantidadeMovimentada() <= 0) {
            throw new IllegalArgumentException("A quantidade movimentada deve ser positiva.");
        }

        Long estoqueAtual = produto.getQuantidadeEmEstoque() == null ? 0L : produto.getQuantidadeEmEstoque();

        if (TipoMovimentacao.saida.equals(request.tipo())) {
            if (estoqueAtual < request.quantidadeMovimentada()) {
                throw new IllegalStateException("Estoque insuficiente para o produto: " + produto.getNome());
            }
            produto.setQuantidadeEmEstoque(estoqueAtual - request.quantidadeMovimentada());
        } else if (TipoMovimentacao.entrada.equals(request.tipo())) {
            produto.setQuantidadeEmEstoque(estoqueAtual + request.quantidadeMovimentada());
        }
        produtoRepository.save(produto);

        // 5. Criar e salvar a movimentação
        Movimentacoes novaMovimentacao = new Movimentacoes();
        novaMovimentacao.setProduto(produto);
        novaMovimentacao.setUsuario(usuario);
        novaMovimentacao.setQuantidadeMovimentada(request.quantidadeMovimentada());
        novaMovimentacao.setTipo(request.tipo());
        novaMovimentacao.setDataHoraMovimentacao(LocalDateTime.now());

        Movimentacoes movimentacaoSalva = movimentacaoRepository.save(novaMovimentacao);

        return convertToResponse(movimentacaoSalva);
    }

    @Override
    public MovimentacaoResponse buscarPorId(Long id) {
        Movimentacoes movimentacao = movimentacaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Movimentação não encontrada com ID: " + id));
        return convertToResponseWithDetails(movimentacao);
    }

    @Override
    public List<MovimentacaoResponse> listar() {
        return movimentacaoRepository.findAll().stream()
                .map(this::convertToResponseWithDetails)
                .collect(Collectors.toList());
    }

    @Override
    public List<MovimentacaoResponse> listarMovimentacoesPorProduto(Long produtoId) {
        if (!produtoRepository.existsById(produtoId)) {
            throw new EntityNotFoundException("Produto não encontrado com ID: " + produtoId);
        }
        return movimentacaoRepository.findByProdutoId(produtoId).stream()
                .map(this::convertToResponseWithDetails)
                .collect(Collectors.toList());
    }

    private MovimentacaoResponse convertToResponse(Movimentacoes movimentacao) {

        return new MovimentacaoResponse(
                movimentacao.getId(),
                movimentacao.getProduto() != null ? movimentacao.getProduto().getNome() : null,
                movimentacao.getProduto() != null ? movimentacao.getProduto().getId() : null,
                movimentacao.getQuantidadeMovimentada(),
                movimentacao.getTipo(),
                movimentacao.getDataHoraMovimentacao(),
                movimentacao.getUsuario() != null ? movimentacao.getUsuario().getNome() : null,
                movimentacao.getUsuario() != null ? movimentacao.getUsuario().getId() : null
        );
    }

    private MovimentacaoResponse convertToResponseWithDetails(Movimentacoes movimentacao) {
        String produtoNome = null;
        Long produtoIdRet = null;
        if (movimentacao.getProduto() != null) {
            produtoNome = movimentacao.getProduto().getNome();
            produtoIdRet = movimentacao.getProduto().getId();
        }

        String usuarioNome = null;
        Long usuarioIdRet = null;
        if (movimentacao.getUsuario() != null) {
            usuarioNome = movimentacao.getUsuario().getNome();
            usuarioIdRet = movimentacao.getUsuario().getId();
        }

        return new MovimentacaoResponse(
                movimentacao.getId(),
                produtoNome,
                produtoIdRet,
                movimentacao.getQuantidadeMovimentada(),
                movimentacao.getTipo(),
                movimentacao.getDataHoraMovimentacao(),
                usuarioNome,
                usuarioIdRet
        );
    }
}