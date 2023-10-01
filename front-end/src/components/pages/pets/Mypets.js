import { useState,useEffect } from "react";
import {Link} from "react-router-dom"
import RoundedImage from "../../layouts/RoundedImage"
import useFlashMessage from "../../layouts/Message"
import api from "../../../utils/api"
import styles from "./DashBoard.module.css"
function Mypets(){
    const [pets,setPets] = useState([])
    const [token] = useState(localStorage.getItem("token") || "")
    const {setFlashMessage} = useFlashMessage()
    useEffect(()=>{
        api.get("/pet/mypets", {
            
        })
        .then((result) => {
            setPets(result.data.pets)
        })
    },[token])
    async function removePet(id){
        let msgType = "sucess"
        const data = await api.delete(`/pet/${id}`,{
            headers :{
                Authorization : `Bearer ${JSON.parse(token)}`
            }
        }).then((result) => {
            const updatedPets = pets.filter((pet)=>(pet._id != id ))
            setPets(updatedPets)
            return result.data
        }).catch((err) => {
            msgType = err
            return err.response.data
        });
        setFlashMessage(data.message,msgType)
    }
    async function concludeAdoption(id){
        let msgType = "sucess"
        const data = await api.patch(`/pet/conclude/${id}`,{
            headers :{
                Authorization : `Bearer ${JSON.parse(token)}`
            }
        }).then((result) => {
            
        }).catch((err) => {
            msgType = err
            return err.response.data
        });
        setFlashMessage(data.message,msgType)
    }
    return (
        <section >
            <div className={styles.petlist_header}>
                <h1>My Pets</h1>
                <Link  to="/pet/add">Cadastrar Pet</Link>
            </div>
            <div className={styles.petlist_container}>
                {pets.length > 0 &&
                 pets.map((pet) =>(
                    <div className={styles.petlist_row} key={pet._id}>
                        <RoundedImage
                            src={
                            `${process.env.REACT_APP_API}/images/pets/${pet.images}`}
                            alt={pet.name}
                            key={`${pet.name}`}
                            width="75px"
                        />
                        <span className="bold">{pet.name}</span>
                        <div className={styles.actions}>
                            {pet.available ?
                             (<>
                                {pet.adopter && 
                                (<button className={styles.conclude_btn} onClick={()=>{
                                    concludeAdoption(pet._id)
                                }}>
                                    Concluir adoção
                                </button>)}

                                <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                                <button onClick={()=>{
                                    removePet(pet._id)
                                }}>Excluir </button>
                             </>) 

                            :(<p>pet já adotado</p>)
                            }
                        </div>
                    </div>
                 ))}
                {pets.length === 0 && <p>Não a Pets Cadastrados</p>}
            </div>
        </section>
    )
} 
export default Mypets