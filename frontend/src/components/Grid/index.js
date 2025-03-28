import axios from 'axios';
import GridItem from '../GridItem';
import { useState, useEffect } from 'react';
import Alerta from '../Alerta';

export default function Grid() {
    const [produto, setProduto] = useState([]);
    const [alerta, setAlerta] = useState(null);

    useEffect(() => {
        buscarProduto();
    }, []);
    const buscarProduto = async () => {
        try {
            const response = await axios.get('http://localhost:3001/produtos');
            setProduto(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            setAlerta({ message: "Falha ao buscar produtos.", type: "danger" });
        }
    };



    const fecharAlerta = () => {
        setAlerta(null);
    };

    const exibirAlertaExclusao = (message, type) => {
        setAlerta({ message, type });
        if (type === "success") {
            buscarProduto();
        }
    };

    return (
        <div className="table-responsive">
            {alerta && <Alerta message={alerta.message} type={alerta.type} onClose={fecharAlerta} />}
            <div className='d-flex justify-content-center'>
                <h2 className='fw-bold'>
                    Produtos
                </h2>
            </div>
            <table className="table table-striped table-bordered mb-5">
                <thead>
                    <tr>
                        <th className="col-2">Código EAN</th>
                        <th className="col-2">Produto</th>
                        <th className="col-2">Preço</th>
                        <th className="col-2">Categoria</th>
                        <th className="col-2">Quantidade</th>
                        <th className="col-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produto.map(p => (
                        <GridItem
                            key={p.id}
                            produto={p}
                            onExcluirSucesso={(msg) => exibirAlertaExclusao(msg, "success")}
                            onExcluirErro={(msg) => exibirAlertaExclusao(msg, "danger")}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}