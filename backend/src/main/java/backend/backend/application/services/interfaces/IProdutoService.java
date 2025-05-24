package backend.backend.application.services.interfaces;

import backend.backend.application.object.produto.ProdutoSalvarRequest;
import backend.backend.domain.entities.Produto;


public interface IProdutoService {
    
    Produto SalvarProduto(ProdutoSalvarRequest produtoRequest);

}