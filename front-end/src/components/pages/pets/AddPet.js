import styles from "./AddPet.module.css"
import { useState } from "react";
import api from "../../../utils/api"
import { Navigate } from "react-router-dom";
import useFlashMessages from "../../../hooks/useFlashMessage";
import PetForm from "../../form/PetForm";

function AddPet(){
    
    
    return (
        <div>
            <h1></h1>
            <PetForm btnText="Cadastrar Pet" />
        </div>
        
    )
} 
export default AddPet;