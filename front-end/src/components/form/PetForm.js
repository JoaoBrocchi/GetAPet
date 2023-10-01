
import { useState } from "react";
import Input from "./Input";
import formStyles from "./Form.module.css"
import Select from "./Select";

function PetForm(petData, btnText, handleSubmit){
    const [pet,setPet] = useState(petData || {})
    const [preview,setPreview] = useState([])
    const colors = ["Branco", "Preto", "Cinza", "Caramelo"]
    function handleColor(e){
        setPet({...pet,color : e.target.options[e.target.selectedIndex].text})
    }
    function FileChange(e){
        setPreview(Array.from(e.target.files))
        setPet({...pet,images :[e.target.files]})
    }
    function handleChange(e){
        setPet({...pet,[e.target.name]: e.target.value})
    }
    function submit(e){
        e.preventDefault()
        handleSubmit(pet)
    }
    
    return (
     <form onSubmit={submit} className={formStyles.form_container}>
        <div className={formStyles.preview_pet_images}>
            {preview.length > 0
                ? preview.map((image,index)=>(
                    <img src={
                        URL.createObjectURL(image)}
                        alt={pet.name}
                        key={`${pet.name} + ${index}`}/>
                )) :
                pet.images &&
                pet.images.map((image,index)=>( 
                    <img src={
                        `${process.env.REACT_APP_API}/images/pets/${pet.images}`}
                        alt={pet.name}
                        key={`${pet.name} + ${index}`}/>
                ))
            }   
        </div>
        <Input
            text="imagens do Pet"
            type="file"
            name="images"
            handleOnChange={FileChange}
            multiple={true}

        />
        <Input
            text="Nome do Pet"
            type="text"
            name="name"
            handleOnChange={handleChange}
            placeholder="Digite o nome do pet"
            value={petData.name || ""}

        />
        <Input
            text="Idade do Pet"
            type="text"
            name="age"
            handleOnChange={handleChange}
            placeholder="Digite a idade do pet"
            value={petData.age || ""}

        />
        <Input
            text="peso do Pet"
            type="number"
            name="weight"
            handleOnChange={handleChange}
            placeholder="Digite o peso do pet"
            value={petData.weight|| ""}

        />
        <Select
            name="color"
            text="Selecione a cor"
            options={colors}
            handleOnChange={handleColor}
            value={petData.color || ""}
        /> 
        <input type="submit" value={btnText}/>

     </form>  
    )    
} 
export default PetForm ;