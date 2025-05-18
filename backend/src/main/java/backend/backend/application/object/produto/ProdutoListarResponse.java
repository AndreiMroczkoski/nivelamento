package backend.backend.application.object.produto;

public record ProdutoListarResponse(Long Id, String nome, Double preco, String categoria, Long quantidade) {
}
