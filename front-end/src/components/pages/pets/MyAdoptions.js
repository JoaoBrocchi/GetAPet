import styles from "./DashBoard.module.css"
import api from "../../../utils/api";
import { useState,useEffect } from "react";
import RoundedImage from "../../layouts/RoundedImage";
import useFlashMessage from "../../../hooks/useFlashMessage"




function MyAdoptions(){
    const [token] = useState(localStorage.getItem("token") || "")
    const [pets,setPets] = useState([])
    
    const {setFlashMessage} = useFlashMessage()
    
    useEffect(()=>{
        api.get("/pet/myadoptions",{
            headers :{
                Authorization : `Bearer ${JSON.parse(token)}`
            }
            })
        .then((result) => {
            setPets(result.data.pet)
        })
        .catch((err) => {
        })
    },[token])

    return (
        
        <section>
            <div className={styles.petlist_header}>
                <p>Minhas adoções</p>
            </div>
            <div className={styles.petlist_container}>
                {pets.length > 0 && (
                    pets.map((pet)=>{
                        <div className={styles.petlist_row} key={pet._id}>
                        <RoundedImage
                            src={
                            `${process.env.REACT_APP_API}/images/pets/${pet.images}`}
                            alt={pet.name}
                            key={`${pet.name}`}
                            width="75px"
                        />
                        <span className="bold">{pet.name}</span>
                        <div>
                            <p>
                                <span className="bold">Ligue para:</span>{pet.user.phone}
                            </p>
                        </div>
                        <div className={styles.actions}>
                            {pet.available ?
                             (<p>Adoção em processo</p>) 

                            :(<p>pet já adotado</p>)
                            }
                        </div>
                    </div>
                    })
                )}
                {pets.length === 0 && <p>Ainda não ah nhenum pet cadastrado</p>}
            </div>
        </section>
    )
}

export default MyAdoptions;