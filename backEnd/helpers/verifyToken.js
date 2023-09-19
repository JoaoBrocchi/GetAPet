const jwt = require("jsonwebtoken")
const getToken = require("./getToken")
const verifyToken = (req,res,next)=>{

    if(!req.headers.authorization){
        return res.status(401).json({message:"acesso negado"})
    }
    const token = getToken(req)
    if (!token){
        return res.status(401).json({message:"acesso negado"})
    }
    try {
        const verified = jwt.verify(token,process.env.SECRET)
        req.user = verified
        next()
    }
    catch {
        return res.status(400).json({message:"Token Invalido"})
    }
}

module.exports = verifyToken