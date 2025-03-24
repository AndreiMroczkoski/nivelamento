import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Alerta from '../../components/Alerta';


export default function CadastroUsuario() {
    const [usuarioInformado, setUsuario] = useState({
        id: "",
        usuario: "",
        senha: "",
        cep: "",
        logradouro: "",
        bairro: "",
        cidade: "",
        estado: ""
    });
    const [alerta, setAlerta] = useState(null);
    const navigate = useNavigate();

    const cadastrarUsuario = async (e) => {
        e.preventDefault();

        if (!usuarioInformado.usuario || !usuarioInformado.id ||  !usuarioInformado.senha || !usuarioInformado.cep 
            || !usuarioInformado.logradouro || !usuarioInformado.bairro || !usuarioInformado.cidade || !usuarioInformado.estado ) {
            setAlerta({ message: "Por favor, preencha todos os campos.", type: "warning" });
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/usuarios", usuarioInformado);
            console.log("Usuario criado:", response.data);
            setAlerta({ message: "Usuário cadastrado com sucesso!", type: "success" });
            setTimeout(() => navigate("/ListaUsuarios"), 2000);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            setAlerta({ message: "Falha ao cadastrar o usuário.", type: "danger" });
        }
    };

    const buscarCep = async (cep) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const { logradouro, bairro, localidade, uf } = response.data;
            setUsuario(prevUsuario => ({
                ...prevUsuario,
                logradouro,
                bairro,
                cidade: localidade,
                estado: uf
            }));
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
            setAlerta({ message: "CEP não encontrado ou inválido.", type: "danger" });
        }
    };

    const seletorCEP = (e) => {
        const cep = e.target.value;
        setUsuario(prevUsuario => ({ ...prevUsuario, cep }));
        if (cep.length === 8) {
            buscarCep(cep);
        }
    };

    const fecharAlerta = () => {
        setAlerta(null);
    };

    return (
        <div className="container mt-5 mb-5">
            {alerta && <Alerta message={alerta.message} type={alerta.type} onClose={fecharAlerta} />}
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    <div className="card shadow">
                        <div className="card-header bg-dark text-white text-center fw-bold">
                            <h3>Cadastro de Usuario</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={cadastrarUsuario}>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">ID de Usuário</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={usuarioInformado.id}
                                            onChange={(e) => setUsuario({ ...usuarioInformado, id: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Nome do Usuario</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={usuarioInformado.usuario}
                                            onChange={(e) => setUsuario({ ...usuarioInformado, usuario: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Senha</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={usuarioInformado.senha}
                                            onChange={(e) => setUsuario({ ...usuarioInformado, senha: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">CEP</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={usuarioInformado.cep}
                                        onChange={seletorCEP}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Logradouro</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={usuarioInformado.logradouro}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Bairro</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={usuarioInformado.bairro}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Cidade</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={usuarioInformado.cidade}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Estado</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={usuarioInformado.estado}
                                            readOnly
                                        />
                                    </div>
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