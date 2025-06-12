import api from "./api";

export const listarMovimentacoes = async () => {
  const res = await api.get("/movimentacoes/listar");
  return res.data;
};


export const registrarMovimentacao = async (movimentacaoData) => {
  const res = await api.post("/movimentacoes/registrar", movimentacaoData);
  return res.data;
};
 
export const movimentacaoService = {registrarMovimentacao, listarMovimentacoes};