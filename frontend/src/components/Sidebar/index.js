import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

export default function Sidebar() {
    return (
        <div className={`${styles.sidebar} d-flex flex-column bg-dark text-light`}>
            <div className="p-3 text-center">
                <img
                    src="https:www.pa.senac.br/resources/site-v2/images/senac_logo_branco.png"
                    alt="Logo"
                    className="img-fluid md-2"
                    style={{ maxWidth: "120px" }}
                />
            </div>

            <ul className="nav flex-column flex-grow-1">
                <li className="nav-item">
                    <Link to="/" className="nav-link text-light">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/Grid" className="nav-link text-light">
                        Produtos
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/ListaUsuarios" className="nav-link text-light">
                        Usuários
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/ListaMovimentacoes" className="nav-link text-light">
                        Movimentações
                    </Link>
                </li>

                <li className="nav-item">
                    <a
                        className="nav-link text-light"
                        data-bs-toggle="collapse"
                        href="#submenuCadastro"
                        role="button"
                        aria-expanded="false"
                        aria-controls="submenuCadastro"
                    >
                        Cadastro
                    </a>
                    <ul className="collapse list-unstyled ms-3" id="submenuCadastro">
                        <li>
                            <Link to="/CadastroProduto" className="nav-link text-light">
                                Produtos
                            </Link>
                            <Link to="/CadastroUsuario" className="nav-link text-light">
                                Usuários
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}