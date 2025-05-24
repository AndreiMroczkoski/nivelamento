    package backend.backend.application.services;

    import backend.backend.application.object.produto.ProdutoListarResponse;
    import backend.backend.application.object.produto.ProdutoSalvarRequest;
    import backend.backend.application.object.usuario.UsuarioListarResponse;
    import backend.backend.application.services.interfaces.IProdutoService;
    import backend.backend.domain.entities.Produto;
    import backend.backend.domain.entities.Usuario;
    import backend.backend.domain.repository.ProdutoRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.stereotype.Service;

    import java.util.List;

    @Service
    public class ProdutoService implements IProdutoService {


        @Autowired
        ProdutoRepository produtoRepository;


        @Override
        public Produto SalvarProduto(ProdutoSalvarRequest produto) {
            var lResult = produtoRepository.save(new Produto(produto));


            return lResult;
        }

        public ResponseEntity<String> deletarProduto(Long id) {
            try {

                produtoRepository.deleteById(id);

                return ResponseEntity.ok().build();

            } catch (Exception e) {

                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }

        public List<ProdutoListarResponse> ListarProduto() {

            var lResult = produtoRepository.findAll().stream()
                    .map(produto -> new ProdutoListarResponse(
                           produto.getId(),
                            produto.getNome(),
                            produto.getPreco(),
                            produto.getCategoria(),
                            produto.getQuantidade()
                    ))
                    .toList();
            return lResult;
        }
    }
