import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Alerta from "../../components/Alerta";
import { produtoService } from "../../service/produtoService"; 
import { movimentacaoService } from "../../service/movimentacaoService";
import { useUsuarioContext } from "../../contexts/Usuario";

export default function MovimentarProduto() {
    const [quantidade, setQuantidade] = useState("");
    const [tipo, setTipo] = useState("entrada");
    const [produto, setProduto] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alerta, setAlerta] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();
    const { usuario } = useUsuarioContext();

    useEffect(() => {
        const buscarProduto = async () => {
            try {
                const response = await produtoService.buscarPorId(id);
                setProduto(response);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
                setAlerta({ message: "Erro ao carregar dados do produto.", type: "danger" });
            }
        };

        if (id) {
            buscarProduto();
        }
    }, [id]);

    const submit = async (e) => {
        debugger;
        e.preventDefault();
        if (!quantidade || parseInt(quantidade) <= 0) {
            setAlerta({ message: "Por favor, insira uma quantidade válida.", type: "warning" });
            return;
        }

    
        setIsSubmitting(true);

        const movimentacaoRequest = {
            useUsuarioContext: usuario.id,
            produtoId: parseInt(id),
            quantidadeMovimentada: parseInt(quantidade),
            tipo: tipo,
        };

        try {

            await movimentacaoService.registrarMovimentacao(movimentacaoRequest);

            setAlerta({ message: "Movimentação registrada com sucesso!", type: "success" });
            setTimeout(() => navigate("/Grid"), 2000);

        } catch (error) {
            console.error("Erro ao registrar movimentação:", error);
            const errorMessage = error.response.data|| "Falha ao registrar movimentação.";
            setAlerta({ message: errorMessage, type: "danger" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const fecharAlerta = () => setAlerta(null);

    return (
        <div className="container mt-5">
            {alerta && <Alerta message={alerta.message} type={alerta.type} onClose={fecharAlerta} />}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-dark text-white text-center">
                            <h3>Movimentar Produto</h3>
                        </div>
                        <div className="card-body">
                            {produto ? (
                                <form onSubmit={submit}>
                                    <div className="mb-4 text-center">
                                        <h4 className="font-weight-bold">{produto.nome}</h4>
                                        <h6>Estoque Atual: {produto.quantidade}</h6>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Quantidade:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={quantidade}
                                            onChange={(e) => setQuantidade(e.target.value)}
                                            min="1"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Tipo:</label>
                                        <select
                                            className="form-select"
                                            value={tipo}
                                            onChange={(e) => setTipo(e.target.value)}
                                        >
                                            <option value="entrada">Entrada</option>
                                            <option value="saida">Saída</option>
                                        </select>
                                    </div>

                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
                                            {isSubmitting ? "Registrando..." : "Registrar Movimentação"}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                    <p className="mt-2">Buscando produto...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
