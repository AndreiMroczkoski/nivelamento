package backend.backend.application.object.produto;

public record ProdutoListarResponse(Long id, String nome, Double preco, String categoria, Long quantidade) {
}
