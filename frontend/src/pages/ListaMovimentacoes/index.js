import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Alerta from "../../components/Alerta";
import { movimentacaoService } from "../../service/movimentacaoService";

export default function ListaMovimentacoes() {
    const [movimentacao, setMovimentacao] = useState([]);
    const [alerta, setAlerta] = useState(null);

    useEffect(() => {
        const buscarMovimentacoes = async () => {
            debugger;
            try {
                const response = await movimentacaoService.listarMovimentacoes();
                setMovimentacao(response || []); 
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
                <div className="col-md-10">
                    <div className="card shadow">
                        <div className="card-header bg-dark text-white text-center">
                            <h3>Histórico de Movimentações</h3>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered text-center">
                                    <thead>
                                        <tr>
                                        
                                            <th>ID Mov.</th>
                                            <th>ID Produto</th>
                                            <th>Produto</th>
                                            <th>Quantidade</th>
                                            <th>Tipo</th>
                                            <th>Data e Hora</th>
                                            <th>Usuário</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {movimentacao.map((movimentacao) => (
                                            <tr key={movimentacao.id}>
                                                <td>{movimentacao.id}</td>
                                                <td>{movimentacao.produtoId}</td>
                                                <td>{movimentacao.produtoNome}</td>                  
                                                <td>{movimentacao.quantidadeMovimentada}</td>
                                                <td>{movimentacao.tipo}</td>
                                                <td>
                                                    {new Date(movimentacao.dataHoraMovimentacao).toLocaleString('pt-BR')}
                                                </td>
                                                <td>{movimentacao.usuarioNome}</td>
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