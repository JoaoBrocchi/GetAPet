import api from "../../../utils/api"
import { useState,useEffect } from "react"
import styles from "./AddPet.module.css"
import useFlashMessage from "../../../hooks/useFlashMessage"
import { useParams } from "react-router-dom"
import PetForm from "../../form/PetForm"
function EditPet(){
    const [pet,setPet] = useState({})
    const [token] = useState(localStorage.getItem("token") || "")
    const{id}= useParams()
    const {setFlashMessage} = useFlashMessage()
    
    useEffect(async ()=>{
        await api.get(`/pet/${id}`,{
            headers :{
                Authorization : `Bearer ${JSON.parse(token)}`
            }
        }).then((result) => {
            setPet(result.data.pet)
        }).catch((err) => {
            // msgType = err
            // return err.response.data
        });
    },[token,id])
    async function updatePet(pet){
        let msgType = "sucess"
        const formData = new FormData
        await Object.keys(pet).forEach((key)=>{
            if(key === "images"){
                for(let i =0; 1< pet[key].length; i++){
                    formData.append("images",pet[key][i])  
                }
            }
            else{
                formData.append(key,pet[key])
            }
        })
        const data = await api.patch(`/pet/${pet._id}`, formData, {
            Authorization : `Bearer ${JSON.parse(token)}`,
            "Content-Type" : "multipart/form-data"
        })
        .then((result) => {
            return result.data
        }).catch((err) => {
            msgType = "error"
            return err.response.data
        });
        setFlashMessage(data.message,msgType)
    }
    return (
       <section>
        <div className={styles.addpet_header}>
            <h1>Editando o pet : {pet.name}</h1>
            <p>depois da edição os dados serão salvos no sistema</p>
        </div>
        {pet.name &&

         (<PetForm handleSubmit={updatePet} />)}
       </section>
    )
}

export default EditPet;