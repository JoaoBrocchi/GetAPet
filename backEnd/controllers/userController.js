const createUserToken = require("../helpers/create-user-token")
const getToken = require("../helpers/getToken")
const User  =  require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const getUserByToken = require("../helpers/get-user-by-token")
module.exports = class UserControle{
    static async userRegister(req,res){
        const {name,email,password,phone,image,confirmpassword} = req.body
        

        if(!name){
            res.status(422).json({message : "não pode deixar o campo name undefined"})
            return
        }
        if(!email){
            res.status(422).json({message : "não pode deixar o campo email undefined"})
            return
        }
        if(!password){
            res.status(422).json({message : "não pode deixar o campo password undefined"})
            return
        }
        if(!confirmpassword){
            res.status(422).json({message : "não pode deixar o campo confirmpassword undefined"})
            return
        }
        if(!phone){
            res.status(422).json({message : "não pode deixar o campo telefone undefined"})
            return
        }
        if (password != confirmpassword){
            res.status(422).json({message : "As senhas não coincidem"})
            return
        }
        const userExists = await User.findOne({email : email})

        if (userExists){
            res.status(422).json({message : "por favor utilize outro email"})
            return 
        }
        
        else {
            const hashedpassword = bcrypt.hashSync(password,bcrypt.genSaltSync(10))

        const user = new User({name,email,password: hashedpassword,image,phone})

        try {
            const newUser = await user.save(user)
            await createUserToken(newUser,req,res)
            
        }
        catch(err){
            res.status(500).json({message:"aconteceu o erro :", err})
            return
        }

        }
    }

    static async login(req,res){
        
        const {email,password} = await req.body
        console.log(email,password)
        if(!email){
            res.status(422).json({message : "não pode deixar o campo emailvazio"})
            return
        }
        if(!password){
            res.status(422).json({message : "não pode deixar o campo password vazio"})
            return
        }

        const user = await User.findOne({email : email})
        if (!user){
            res.status(422).json({message : "Não a usuario cadastrado com esse email"})
            return
        }

        const checkpassword = bcrypt.compareSync(password,user.password)
        console.log(password,user.password)
        if (!checkpassword){
            res.status(422).json({
                message : "A senha esta invalida"
            })
            return
        }
        await createUserToken(user,req,res)
    }

    static async checkUser(req,res){
        let currentUser
        console.log(req.headers.authorization)
        if(req.headers.authorization){

            const token = getToken(req)
            const decoded = jwt.verify(token,process.ev.SECRET)
            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined

        } else {
            currentUser = null
        }
        res.status(200).send(currentUser)
    }
    
    static async getUserById(req,res){
        const id = req.params.id

        try {
            const user = await User.findById(id).select("-password")
            res.status(200).json({user})
        }
        catch(err) {
            
            res.status(422).json({
                message : "usuario não encontrado!"
            })
            return
            
        }
        
        
    }

    static async editUser(req,res){
        
        const user = await  getUserByToken(getToken(req))
        console.log(user)    
          
        if(!user){
            res.status(422).json({
                message : "usuario não encontrado!"
            })
        }
        const {name,email,password,phone,confirmpassword} = req.body
        
        
        
        
        if(!name){
            res.status(422).json({message : "não pode deixar o campo name undefined"})
            return
        }
        if(!email){
            res.status(422).json({message : "não pode deixar o campo email undefined"})
            return
        }
        if(!password){
            res.status(422).json({message : "não pode deixar o campo password undefined"})
            return
        }
        if(!confirmpassword){
            res.status(422).json({message : "não pode deixar o campo confirmpassword undefined"})
            return
        }
        if(!phone){
            res.status(422).json({message : "não pode deixar o campo telefone undefined"})
            return
        }
        
        const userExists = await User.findOne({email : email})

        console.log(user.email, email)
        if(userExists && user.email != email){
            res.status(422).json({message : "por favor utilize outro email"})
            return
        }
        let image = ""
        if(req.file){
            image = req.file.filename
        } 
        console.log(image)
        user.image = image
        user.email = email
        user.phone = phone
        if (password != confirmpassword){
            res.status(422).json({message : "As senhas não coincidem"})
            return
        } 
        else if(password === confirmpassword && password != null){
            const hashedpassword = bcrypt.hashSync(password,bcrypt.genSaltSync(10))
            user.password = hashedpassword
            console.log(user)
            
        }
        
        try {
           await User.findByIdAndUpdate({_id : user._id},{$set:user},{new:true})
           res.status(500).json({
            message: 'Usuário atualizado com sucesso!',
            
          })
           
        } catch (error) {
            res.status(500).json({message : error})
            return
        }

    }


}