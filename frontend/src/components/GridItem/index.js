import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ModalConfirmarExclusao from '../modalConfirmarExclusao';
import { produtoService } from '../../service/produtoService';


function formatarParaReais(preco) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(preco);
}

export default function GridItem({ produto, onExcluirSucesso, onExcluirErro }) {
    const navigate = useNavigate();
    const [modalAberto, setModalAberto] = useState(false);
    const [produtoParaExcluir, setProdutoParaExcluir] = useState(null);

    
    

    const movimentar = () => {
        navigate(`/MovimentarProduto/${produto.id}`);
    };  

    const abrirModalExcluir = () => {
        setProdutoParaExcluir(produto);
        setModalAberto(true);
    };

    const fecharModalExcluir = () => {
        setProdutoParaExcluir(null);
        setModalAberto(false);
    };

    const excluirProduto = async () => {
        try {
            debugger;
            await produtoService.deletarProdutos(produtoParaExcluir.id);
            onExcluirSucesso("Produto excluído com sucesso!");
            
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            onExcluirErro("Falha ao excluir o produto.");
        }
        fecharModalExcluir();
    };

    return (
        <>
            <tr>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{formatarParaReais(produto.preco)}</td>
                <td>{produto.categoria}</td>
                <td>{produto.quantidade}</td>
                <td>
                    <button className="btn bg-dark text-light me-2" onClick={movimentar}>Movimentar</button>
                    <button className="btn btn-danger" onClick={abrirModalExcluir}>Excluir</button>
                </td>
            </tr>
            <ModalConfirmarExclusao
                isOpen={modalAberto}
                onClose={fecharModalExcluir}
                onConfirm={excluirProduto}
                itemNome={produtoParaExcluir?.nome}
            />
        </>
    );
}