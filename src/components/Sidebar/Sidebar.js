import HeaderLink from '../HeaderLink'
import style from './sidebar.module.css';

export default function Sidebar() {
    return (

        <div className={style.sidebar}>
            <nav>
                <HeaderLink url="./productform">
                    Cadastro de Produtos
                </HeaderLink>
            </nav>
        </div>

    )
}