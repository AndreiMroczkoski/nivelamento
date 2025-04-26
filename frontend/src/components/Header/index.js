
import { useDispatch } from 'react-redux';
import style from './header.module.css'
import { logout } from '../../redux/authSlice';

export default function Header() {

    const dispatch = useDispatch();


    return (    

       <header className={`${style.header} bg-dark `}>
           <nav className='d-flex'>
                <button className="btn btn-light " onClick={(e) => {
                    e.preventDefault();
                    dispatch(logout());
                }}>
                    Logout
                </button>
            </nav>
        </header>



    )
}