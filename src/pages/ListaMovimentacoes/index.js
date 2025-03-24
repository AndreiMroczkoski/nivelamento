import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Alerta from "../../components/Alerta";

export default function ListaMovimentacoes() {
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [alerta, setAlerta] = useState(null);

    useEffect(() => {
        const buscarMovimentacoes = async () => {
            try {
                const response = await axios.get("http://localhost:3001/movimentacoes");
                setMovimentacoes(response.data.reverse());
            } catch (error) {
                console.error("Erro ao buscar movimentações:", error);
                setAlerta({ message: "Falha ao buscar movimentações.", type: "danger" });
            }
        };

        buscarMovimentacoes();
    }, []);

    const fecharAlerta = () => {
        setAlerta(null);
    };

    return (
        <div className="container mt-5 mb-5">
            {alerta && <Alerta message={alerta.message} type={alerta.type} onClose={fecharAlerta} />}
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-header bg-dark text-white text-center">
                            <h3>Movimentações</h3>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="col-2">Produto</th>
                                            <th className="col-2">Quantidade</th>
                                            <th className="col-2">Tipo</th>
                                            <th className="col-2">Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {movimentacoes.map((movimentacao) => (
                                            <tr key={movimentacao.id}>
                                                <td>{movimentacao.produto}</td>
                                                <td>{movimentacao.quantidade}</td>
                                                <td>{movimentacao.tipo}</td>
                                                <td>{movimentacao.data}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}