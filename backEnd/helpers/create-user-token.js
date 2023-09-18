const jwt = require("jsonwebtoken")


module.exports = async function createuserToken(user,req,res){
    const token = jwt.sign({
        name:user.name,
        id:user._id
    },process.env.SECRET
        )
    res.status(200).json({
        message : "Você está autenticado",
        token : token,
        userId : user._id
    })
}