import { useState,useEffect } from "react";
import {Link} from "react-router-dom"

function Mypets(){
    const [pets,setPets] = useState([])
    return (
        <section>
            <h1>My Pets</h1>
            <Link  to="/pet/add">Cadastrar Pet</Link>
            <div>{pets.lenght > 0 && <p>Meus pets Cadastrados</p>}</div>
            {pets.length === 0 && <p>Não a Pets Cadastrados</p>}

        </section>
    )
} 
export default Mypets