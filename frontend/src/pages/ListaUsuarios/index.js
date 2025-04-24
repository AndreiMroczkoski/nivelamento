import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alerta from '../../components/Alerta';
import ModalConfirmarExclusao from '../../components/modalConfirmarExclusao';

export default function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioParaExcluir, setUsuarioParaExcluir] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [alerta, setAlerta] = useState(null);

    useEffect(() => {
        const buscarUsuarios = async () => {
            try {
                const response = await axios.get("http://localhost:8080/usuario/listar");
                setUsuarios(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                setAlerta({ message: "Falha ao buscar usuários.", type: "danger" });
            }
        };

        buscarUsuarios();
    }, []);

    const abrirModalExcluir = (usuario) => {
        setUsuarioParaExcluir(usuario);
        setModalAberto(true);
    };

    const fecharModalExcluir = () => {
        setUsuarioParaExcluir(null);
        setModalAberto(false);
    };

    const excluirUsuario = async () => {
        try {

            debugger;
            const responseDelete = await axios.delete(`http://localhost:8080/usuario/${usuarioParaExcluir.id}`);
            if (responseDelete.status==200){
                setAlerta({ message: "Usuário excluído com sucesso!", type: "success" });
            } else {
                setAlerta({ message: "Falha ao excluir o usuário. " + responseDelete.data, type: "danger" });
            }
          
            const response = await axios.get("http://localhost:8080/usuario/listar");
            setUsuarios(response.data);
            fecharModalExcluir();
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
            setAlerta({ message: "Falha ao excluir o usuário.", type: "danger" });
        }
    };

    const fecharAlerta = () => {
        setAlerta(null);
    };

    return (
        <div className="container mt-5 mb-5">
            {alerta && <Alerta message={alerta.message} type={alerta.type} onClose={fecharAlerta} />}
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card shadow">
                        <div className="card-header bg-dark text-white text-center fw-bold">
                            <h3>Lista de Usuários</h3>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>CEP</th>
                                        <th>Logradouro</th>
                                        <th>Bairro</th>
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((usuario) => (
                                        <tr key={usuario.id}>
                                            <td className="col-2">{usuario.id}</td>
                                            <td className="col-2">{usuario.usuario}</td>
                                            <td className="col-2">{usuario.cep}</td>
                                            <td className="col-2">{usuario.logradouro}</td>
                                            <td className="col-2">{usuario.bairro}</td>
                                            <td className="col-2">{usuario.cidade}</td>
                                            <td className="col-2">{usuario.estado}</td>
                                            <td className="col-2">
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => abrirModalExcluir(usuario)}
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ModalConfirmarExclusao
                isOpen={modalAberto}
                onClose={fecharModalExcluir}
                onConfirm={excluirUsuario}
                itemNome={usuarioParaExcluir?.usuario}
            />
        </div>
    );
}