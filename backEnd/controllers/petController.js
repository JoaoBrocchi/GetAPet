const getUserByToken = require("../helpers/get-user-by-token")
const getToken = require("../helpers/getToken")
const Pet = require("../models/Pet")
const ObjectId = require("mongoose").Types.ObjectId

module.exports = class petController{
    static async createPet(req,res){
        const {name,color,age,weight} = req.body
        const available = true

        if(!name){
            res.status(422).json({message : "não pode deixar o campo name undefined"})
            return
        }
        if(!color){
            res.status(422).json({message : "não pode deixar o campo cor undefined"})
            return
        }
        if(!weight){
            res.status(422).json({message : "não pode deixar o campo weight undefined"})
            return
        }
        if(!age){
            res.status(422).json({message : "não pode deixar o campo age undefined"})
            return
        }
        const images = req.files
        if(images.length == 0){
            res.status(422).json({message : "a imagem é obrigatoria"})
            return
        }
        

        const user = await getUserByToken(getToken(req))
        console.log("o dono do pet é o :",user)
        const pet = new Pet({
            name,
            color,
            age,
            weight,
            available,
            images:[],
            user :{
                _id : user._id,
                name: user.name,
                image: user.image,
                phone : user.phone
            },
        })

        images.map(image=>{
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save()
            res.status(201).json({message : "Dog registrado com sucesso",newPet})
        } catch (error) {
            console.log("ao tentar criar o pet eu tive o erro :",error)
            return
        }

    }

    static async getAll(req,res){
        const pets = await Pet.find().sort("-createdAt")
        res.status(200).json({
            pets: pets
        })
    }
    static async getAllUserPets(req,res){
        const user = await getUserByToken(getToken(req))
        const pets = await Pet.find({"user._id" :user._id}).sort("-createdAt")
        res.status(200).json({
            pets: pets
        })
    }
    static async getAllUserAdoptions(req,res){
        const user = await getUserByToken(getToken(req))
        const pets = await Pet.find({"adopter._id":user._id}).sort("-createdAt")
        res.status(200).json({
            pets: pets
        })
    }
    
    static async getPetById(req,res){
        const id = req.params.id
        if(!ObjectId.isValid(id)){
            res.status(422).json({
               message : "id inválido"
            })
            return
        }
        try {
            const pet = await  Pet.findById(id)
            res.status(200).json({
                pet: pet
            })
        } catch (error) {
            console.log(error)
            res.status(404).json({
                message : "pet não encontrado"
             })
        }
        
    }
    static async deletePet(req,res){
        const id = req.params.id
        if(!ObjectId.isValid(id)){
            res.status(422).json({
               message : "id inválido"
            })
            return
        }
        const user = await getUserByToken(getToken(req))
        const pet = await Pet.find({_id: id})
        if(!pet) {
            res.status(404).json({
                message : "epet não encontrado"
             })
             return 
        }
        if(user._id.toString() !== pet.user._id.toString()) {
            res.status(422).json({
                message : "houve um porblema em solicitar sua remoção"
             })
             return
        }

        try {
            await Pet.findByIdAndDelete(id)
            res.status(200).json({
                message: "pet deletado com sucesso"
            })
        } catch (error) {
            console.log(error)
            res.status(404).json({
                message : "houve um erro em remover o pet"
             })
        }
        
    }
    static async updatePet(req,res){
        const id = req.params.id
        if(!ObjectId.isValid(id)){
            res.status(422).json({
               message : "id inválido"
            })
            return
        }
    
        const {name,color,age,weight,available} = req.body
        
        let updatedData
        if(!name){
            res.status(422).json({message : "não pode deixar o campo name undefined"})
            return
        }

        if(!color){
            res.status(422).json({message : "não pode deixar o campo cor undefined"})
            return
        }
        if(!weight){
            res.status(422).json({message : "não pode deixar o campo weight undefined"})
            return
        }
        if(!age){
            res.status(422).json({message : "não pode deixar o campo age undefined"})
            return
        }
        
        if(images.length == 0){
            res.status(422).json({message : "a imagem é obrigatoria"})
            return
        }
        
        updatedData = {
            name:name,
            color:color,
            weight:weight,
            age: age,
            available :available,
            images :[]


        }
        const images = req.files
        images.map(image=>{
            updatedData.images.push(image.filename)
        })
        const user = await getUserByToken(getToken(req))
        const pet = await Pet.find({_id: id})
        if(!pet) {
            res.status(404).json({
                message : "epet não encontrado"
             })
             return 
        }
        if(user._id.toString() !== pet.user._id.toString()) {
            res.status(422).json({
                message : "houve um porblema em solicitar sua remoção"
             })
             return
        }
        try {
            await Pet.findByIdAndUpdate(id,updatedData)
        } catch (error) {
            
        }
    }

    static async schedule(req,res){
        const id = req.params.id
        const user = await getUserByToken(getToken(req))
        try {
            const pet = await Pet.findById({_id: id})
            console.log(pet.user._id,"oi")
            if(user._id.equals(pet.user._id)) {
                res.status(422).json({
                    message : "você não pode pode agendar uma visita com seu próprio pet"
                })
                return
            }
            if(pet.adopter){
                if(pet.adopter._id.equals(user._id)){
                    res.status(422).json({
                        message : "você ja agendou uma visita para esse pet"
                    })
                    return 
                }
            }
            pet.adopter._id = {
                _id : user._id,
                name : user.name,
                image: user.image
            }
            await Pet.findByIdAndUpdate(id,pet)
            res.status(200).json({
                message : `A visita foi agendada com sucesso! Entre em conato com ${pet.user.name}, pelo telefone : ${pet.user.name}`
            })
            return 
            
        }
         catch (error) {
            res.status(404).json({
                message : "pet não encontrado"
             })
            return 
        }
        
    
    } 
    static async concludeAdoption(req,res) {
        const id = req.params.id
        const user = getUserByToken(getToken(req))
        try {
            
            const pet = await Pet.findById({_id: id})
            console.log(pet.user._id,"oi")

            if(user._id !== pet.user._id) {
                res.status(422).json({
                    message : "você não pode pode confirmar uma visita com seu próprio pet"
                })
                return
            }
            pet.available = false
            await Pet.findByIdAndUpdate(id,pet)
            res.status(200).json({
                message : "sucesso"
             })
            return 
        }
        catch {
            res.status(404).json({
                message : "pet não encontrado"
             })
            return 
        }
    }
}