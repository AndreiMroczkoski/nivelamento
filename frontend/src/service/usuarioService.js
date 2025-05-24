import api from "./api";

const cadastrarUsuario = async (ususarioInformado) => {

    const res = await api.post("/usuario/salvar",ususarioInformado);
    return res.data;

};

const deletarUsuario = async (id) => {
    debugger;
    const res = await api.delete("/usuario/deletar/"+id);
    return res.data;

};

const listarUsuarios = async () => {

    const res = await api.get("/usuario/listar");
    return res.data;

};

const listarPorId = async (id) => {

    const res = await api.post("/usuario/listarPorId"+id);
    return res.data;

};

export const usuarioService = {cadastrarUsuario, listarUsuarios, listarPorId, deletarUsuario};