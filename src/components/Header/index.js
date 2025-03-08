import Login from '../../pages/Login'
import HeaderLink from '../HeaderLink'
import style from './header.module.css'

export default function Header() {
    return (

        <header className={`${style.header} bg-dark `}>
            <nav>
                <HeaderLink url="./Login">Login</HeaderLink>
            </nav>
        </header>

    )
}