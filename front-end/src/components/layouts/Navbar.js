import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png"
import Styles from "./Navbar.module.css"
function Navbar(){
    return(
        <nav className={Styles.navbar}>
        <div>
            <img src={Logo} alt="Get A pet"/>
            <h2>Get a Pet</h2>
        </div>
            <ul>
                <li><Link to="/">Adotar</Link></li>
                <li><Link to="/login">Entrar</Link></li>
                <li><Link to="/register">Registrar</Link></li>
            </ul>
        </nav>
    )
}


export default Navbar;