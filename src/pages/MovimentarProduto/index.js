import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Alerta from "../../components/Alerta";

export default function MovimentarProduto() {
    const [quantidade, setQuantidade] = useState("");
    const [tipo, setTipo] = useState("entrada");
    const [produto, setProduto] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [alerta, setAlerta] = useState(null);
    

    useEffect(() => {
        const buscarProduto = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/produtos/${id}`);
                setProduto(response.data);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
                setAlerta({ message: "Erro ao buscar produto.", type: "danger" });
            }
        };

        buscarProduto();
    }, [id]);

    const submit = async (e) => {
        e.preventDefault();
        if (!produto || !quantidade) {
            setAlerta({ message: "Preencha todos os campos.", type: "warning" });
            return;
        }

        const movimento = {
            produto: produto.nome,
            quantidade: parseInt(quantidade),
            tipo,
            data: new Date().toLocaleString(),
        };

        try {
            
            await axios.post("http://localhost:3001/movimentacoes", movimento);

            let novaQuantidade = parseInt(produto.quantidade || 0);
            const qtdMovimento = parseInt(quantidade);

            if (tipo === "entrada") {
                novaQuantidade += qtdMovimento;
            } else {
                novaQuantidade -= qtdMovimento;
                if (novaQuantidade < 0) {
                    setAlerta({ message: "Quantidade insuficiente em estoque.", type: "warning" });
                    return;
                }
            }

            await axios.put(`http://localhost:3001/produtos/${id}`, {
                ...produto,
                quantidade: novaQuantidade.toString(),
            });

            setAlerta({ message: "Movimentação registrada e estoque atualizado com sucesso!", type: "success" });
            setQuantidade("");
            setTipo("entrada");
            setTimeout(() => navigate("/Grid"), 2000);
        } catch (error) {
            console.error("Erro ao registrar movimentação ou atualizar estoque:", error);
            setAlerta({ message: "Falha ao registrar movimentação ou atualizar estoque.", type: "danger" });
        }
    };

    const fecharAlerta = () => {
        setAlerta(null);
    };

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
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Quantidade:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={quantidade}
                                            onChange={(e) => setQuantidade(e.target.value)}
                                            min="1"
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
                                        <button type="submit" className="btn btn-dark">
                                            Registrar Movimentação
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