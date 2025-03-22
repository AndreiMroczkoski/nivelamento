/* import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function MovimentarProduto() {

    const [ProdutoSelecionado, setProdutoSelecionado] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [tipo, setTipo] = useState("entrada");
    const navigate = useNavigate();
    const [produtoNome, setProdutoNome] = useState("");


    useEffect(() => {
        if (location.state?.nome) {
            setProdutoNome(location.state.nome);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ProdutoSelecionado || !quantidade) {
            alert("Preencha todos os campos");
            return;
        }

        const movimento = {
            produto: ProdutoSelecionado,
            quantidade: parseInt(quantidade),
            tipo,
            data: new Date().toLocaleString()
        };

        try {
            await axios.post("http://localhost:3000/movimentacoes", movimento);
            alert("Movimentação registrada com sucesso!");
            setProdutoSelecionado("");
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
                <label>Produto:</label>
                <input type="text" value={produtoNome} disabled />

                <label>Quantidade:</label>
                <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />

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


 */

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function MovimentarProduto() {
    const [ProdutoSelecionado, setProdutoSelecionado] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [tipo, setTipo] = useState("entrada");
    const navigate = useNavigate();
    const location = useLocation();
    const [produtoNome, setProdutoNome] = useState("");

    useEffect(() => {
        if (location.state?.nome) {
            setProdutoNome(location.state.nome);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!produtoNome || !quantidade) {
            alert("Preencha todos os campos");
            return;
        }

        const movimento = {
            produto: produtoNome,
            quantidade: parseInt(quantidade),
            tipo,
            data: new Date().toLocaleString(),
        };

        try {
            await axios.post("http://localhost:3000/movimentacoes", movimento);
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
                <label >Produto:{produtoNome}</label>

                <label>Quantidade:</label>
                <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />

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
