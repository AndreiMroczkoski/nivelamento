import { UsuarioContext, useUsuarioContext } from '../../contexts/Usuario';
import style from './header.module.css'

export default function Header() {

    const { logout } = useUsuarioContext(UsuarioContext);

    return (    

       <header className={`${style.header} bg-dark `}>
           <nav className='d-flex'>
                <button className="btn btn-light " onClick={(e) => {
                    e.preventDefault();
                    logout();
                }}>
                    Logout
                </button>
            </nav>
        </header>



    )
}