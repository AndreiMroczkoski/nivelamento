

export default function Login() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow w-50">
                <h4 className="text-center mb-3">Login</h4>
                <div className="mb-3">  
                    <label className="form-label fs-5">Usuário</label>
                    <input type="text" className="form-control" placeholder="Digite seu usuário" />
                </div>
                <div className="mb-3">
                    <label className="form-label fs-5">Senha</label>
                    <input type="password" className="form-control" placeholder="Digite sua senha" />
                </div>
                <button className="btn w-100 bg-dark text-light pt-3 pb-3 fs-5">Entrar</button>
            </div>
        </div>
    );
}
