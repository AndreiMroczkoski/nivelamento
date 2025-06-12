import api from "./api";

const listarProdutos = async () => {

    const res = await api.get("/produto/listar");
    return res.data;

};

const cadastrarProdutos = async (produtoInformado) => {

    const res = await api.post("/produto/salvar",produtoInformado);
    return res.data;

};

const deletarProdutos = async (id) => {

    const res = await api.delete("/produto/deletar/"+id);
    return res.data;

};

const buscarPorId = async (id) => {
    const res = await api.get("/produto/listarPorId/"+id);
    return res.data;
};

export const produtoService = {listarProdutos, cadastrarProdutos, deletarProdutos, buscarPorId};