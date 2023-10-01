import styles from "./AddPet.module.css"
import { useState } from "react";
import api from "../../../utils/api"
import { Navigate } from "react-router-dom";
import useFlashMessages from "../../../hooks/useFlashMessage";
import PetForm from "../../form/PetForm";

function AddPet(){
    const [token] = useState(localStorage.getItem("token") || "")
    const {setFlashMessage} = useFlashMessages()
    

    async function registerPet(pet){
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
        const data = await api.post('pet/createpet', formData, {
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
        <section className={styles.addpet_header}>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>depois ele ficara disponivel para adoção</p>
                <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
            </div>
        </section>
        
    )
} 
export default AddPet;