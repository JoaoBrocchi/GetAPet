import api from "../../../utils/api";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";
import styles from "./PetDetails.module.css"
function PetDetail(){
    const [pet,setPet] = useState({})
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const token = useState(localStorage.getItem("token" || ""))

    useEffect(() => {
        api.get(`/pet/${id}`).then((response) => {
            setPet(response.data.pet)
            console.log(pet)
            })
            .catch(err => console.log(err))
      }, [id])

    async function schedule(){
        let msgType = "succes"
        const data = api.patch(`/pet/schedule/${id}`,{
            headers :{
                Authorization : `Bearer ${JSON.parse(token)}`
            }
        }).then((result) => {
            return result.data
        }).catch((err) => {
            msgType = "err"
            return err.response.data
        });
        setFlashMessage(data.message,msgType)
    }
    return(
        <>
            {pet.name && (
                <section className={styles.petdetail_container}>
                    <div className={styles.petdetail_container_header}>
                        <h1>Conhecendo o {pet.name}</h1>
                        <p>Marque uma entrevista para conhcelo</p>
                    </div>
                    <div className={styles.pet_images}>
                        {pet.images.map((image,index)=>(
                            <img
                            src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                            alt={pet.name}
                            key={index}
                            />

                            
                        ))}
                    </div>
                    <p>
                        <span className="bold">Peso : {pet.weight}kg</span>
                    </p>
                    <p>
                        <span className="bold">Age : {pet.age} anos</span>
                    </p>
                    {token ?
                     (<button onClick={()=>{
                        schedule()
                     }}>Solicitar uma visita</button>)
                    :(<p>você precisa <Link to={"/register"}>criar uma conta</Link> para poder adotar o pet</p>)
                    }
                </section>
            )}
        </>
    )
}

export default PetDetail;