import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png"
import Styles from "./Navbar.module.css"
import {Context} from "../../context/UserContext"
import { useContext } from "react";
import useAuth from "../../hooks/useAuth"


function Navbar(){
    const { authenticathed, logout } = useContext(Context)
    return(
        <nav className={Styles.navbar}>
            <div className={Styles.navbar_logo}>
                <img src={Logo} alt="Get A pet"/>
                <h2>Get a Pet</h2>
            </div>
            <ul>
                <li><Link to="/">Adotar</Link></li>

                {authenticathed ? (
                    <>
                        <li><Link to="/pet/mypets">Meus pets</Link></li>
                        <li><Link to="/user/profile">Perfil</Link></li>
                        <li><Link to="/pet/myadoptions">Minhas adoções</Link></li>
                        <li onClick={logout}>Sair</li>

                    </>
                ) 
                : ( 
                    <>
                        <li>
                        <Link to="/login">Entrar</Link></li>
                        <li>
                        <Link to="/register">Registrar</Link>
                        </li> 
                    </>
                )    
                }
            </ul>
        </nav>
    )
}


export default Navbar;