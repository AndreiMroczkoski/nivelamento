import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Alerta from '../../components/Alerta';

export default function CadastroProduto() {
    const [produtoInformado, setProduto] = useState({
        id: "",
        nome: "",
        preco: "",
        categoria: "",
        quantidade: ""
    });
    const [alerta, setAlerta] = useState(null);
    const navigate = useNavigate();

    const cadastrarProduto = async (e) => {
        e.preventDefault();

        if (!produtoInformado.nome || !produtoInformado.id || !produtoInformado.preco || !produtoInformado.categoria) {
            setAlerta({ message: "Por favor, preencha todos os campos obrigatórios.", type: "warning" });
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/produtos", produtoInformado);
            console.log("Produto criado:", response.data);
            setAlerta({ message: "Produto cadastrado com sucesso!", type: "success" });
            setTimeout(() => navigate("/Grid"), 2000);
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            setAlerta({ message: "Falha ao cadastrar o produto.", type: "danger" });
        }
    };

    const fecharAlerta = () => {
        setAlerta(null);
    };

    return (
        <div className="container mt-5 mb-5">
            {alerta && <Alerta message={alerta.message} type={alerta.type} onClose={fecharAlerta} />}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-dark text-white text-center fw-bold">
                            <h3>Cadastro de Produto</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={cadastrarProduto}>
                                <div className="mb-3">
                                    <label className="form-label">Código EAN*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={produtoInformado.id}
                                        onChange={(e) => setProduto({ ...produtoInformado, id: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nome do Produto*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={produtoInformado.nome}
                                        onChange={(e) => setProduto({ ...produtoInformado, nome: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Preço*</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={produtoInformado.preco}
                                        onChange={(e) => setProduto({ ...produtoInformado, preco: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Categoria</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={produtoInformado.categoria}
                                        onChange={(e) => setProduto({ ...produtoInformado, categoria: e.target.value })}
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-dark">Salvar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}