const createUserToken = require("../helpers/create-user-token")
const getToken = require("../helpers/getToken")
const User  =  require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
module.exports = class UserControle{
    static async userRegister(req,res){
        const {name,email,password,image,phone,confirmpassword} = req.body
        
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
    
}

