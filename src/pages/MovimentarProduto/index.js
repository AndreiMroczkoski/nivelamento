
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function MovimentarProduto() {
    const [quantidade, setQuantidade] = useState("");
    const [tipo, setTipo] = useState("entrada");
    const [produto, setProduto] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const buscarProduto = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/produtos/${id}`);
            setProduto(response.data);
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
        }
    };

    buscarProduto();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!produto || !quantidade) {
            alert("Preencha todos os campos");
            return;
        }

        const movimento = {
            produto: produto.name,
            quantidade: parseInt(quantidade),
            tipo,
            data: new Date().toLocaleString(),
        };

        try {
            await axios.post("http://localhost:3001/movimentacoes", movimento);
            alert("Movimentação registrada com sucesso!");
            setQuantidade("");
            setTipo("entrada");
        } catch (error) {
            console.error("Erro ao registrar movimentação:", error);
        }
    };

    return (
        <div className="move-product-page">
            <h2>Movimentar Produto</h2>
            <form onSubmit={handleSubmit}>
                <label>Produto: {produto.name}</label>

                <label>Quantidade:</label>
                <input
                    type="number"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                />

                <label>Tipo:</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="entrada">Entrada</option>
                    <option value="saida">Saída</option>
                </select>

                <button type="submit">Registrar Movimentação</button>
            </form>
        </div>
    );
}
