import Styles from "./Footer.module.css"
function Footer(){
    return(
        <footer className={Styles.footer}>
            <p><span className="bold">Get a pet </span> &Copy; 2023
            </p>
        </footer>
    )
}


export default Footer;