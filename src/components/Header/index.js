import HeaderLink from '../HeaderLink'
import style from './header.module.css'

export default function Header() {
    return (

        <header className={style.header}>
            <nav>
                <HeaderLink url="./">
                    Home
                </HeaderLink>
                <HeaderLink url="./ProductList">
                    Listagem Produtos
                </HeaderLink>
            </nav>
        </header>

    )
}