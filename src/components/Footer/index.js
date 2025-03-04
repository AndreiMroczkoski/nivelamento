import style from './footer.module.css';

export default function Footer() {
    return (

        <footer className={style.footer}>
            <p> &copy; {new Date().getFullYear()} Andrei Mroczkoski. Todos os Direitos Reservados.</p>
        </footer>)

}