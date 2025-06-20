import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../../components/Alerta";
import { authService } from "../../service/auth.service";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/authSlice";
import { useUsuarioContext } from "../../contexts/Usuario";

export default function Login() {
    const [usuarioInformado, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    const [alerta, setAlerta] = useState(null);
    const dispatch = useDispatch();
    const { login } = useUsuarioContext();
    
    async function loginSubmit(e) {
    e.preventDefault();

    if (!senha || !usuarioInformado) {
        setAlerta({ message: "Por favor, preencha usuário e senha.", type: "warning" });
        return;
    }

    try {
        debugger;
        const response = await authService.login({
            usuario: usuarioInformado,
            senha: senha
        });
        if (response && typeof response === 'string' && response.length > 50) {
            dispatch(setToken({ nome: usuarioInformado, token: response, logado: true }));
            login(usuarioInformado);
            navigate("/");
        } else {
            setAlerta({ message: "Resposta inesperada do servidor.", type: "danger" });
        }

    } catch (error) {
        if (error.response && error.response.status === 401) {
            setAlerta({ message: error.response.data || "Usuário ou senha inválido!", type: "danger" });
        } else {
            setAlerta({ message: "Problema na comunicação com o servidor. Verifique sua conexão.", type: "danger" });
            console.error("Erro na requisição:", error);
        }
    }
}

    const fecharAlerta = () => {
        setAlerta(null);
    };



    return (
        <>
            
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 shadow w-50">
                    <h4 className="text-center mb-3">Login</h4>
                    <form className="mb-3" onSubmit={loginSubmit}>
                        <label className="form-label fs-5">Usuário</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Digite seu usuário"
                            value={usuarioInformado}
                            onChange={(e) => setUsuario(e.target.value)}
                            onFocus={fecharAlerta}
                        />

                        <label className="form-label fs-5">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            onFocus={fecharAlerta}
                        />
                        <div className="pt-3">
                            {alerta && <Alerta message={alerta.message} type={alerta.type} onClose={fecharAlerta} />}
                            <button type="submit" className="btn w-100 bg-dark text-light pt-3 pb-3 fs-5 ">Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}