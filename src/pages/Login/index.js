import { useState } from "react";
import { UsuarioContext, useUsuarioContext } from "../../contexts/Usuario";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export default function Login() {

    const [usuarioInformado, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const { login } = useUsuarioContext(UsuarioContext);
    const navigate = useNavigate();


    async function loginSubmit(e) {
        e.preventDefault();

        try {
        
        const responseAxios = await axios.get("http://localhost:3001/usuarios?usuario="+usuarioInformado+ "&senha="+senha)

        if (responseAxios.data.length > 0) {
            login({nome: usuarioInformado, usuarioInformado, logado: true});
            navigate("/")
        } else {
            alert("Se ferrou usuário inválido!")
        }

        } catch (error) {
            alert("Problema na comunicação com o servidor" + (error))
        }

    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow w-50">
                <h4 className="text-center mb-3">Login</h4>
                <form className="mb-3" onSubmit={loginSubmit}>
                    <label className="form-label fs-5">Usuário</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Digite seu usuário"
                        value={usuarioInformado}
                        onChange={(e) => setUsuario(e.target.value)} />

                    <label className="form-label fs-5">Senha</label>
                    <input type="password"
                        className="form-control"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)} />
                    <div className="pt-3">
                        <button type="submit" className="btn w-100 bg-dark text-light pt-3 pb-3 fs-5 ">Entrar</button>
                    </div>
                </form>

            </div>
        </div>
    );
}
