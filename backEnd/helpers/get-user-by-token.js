const jwt = require("jsonwebtoken")
const getToken = require("./getToken")
const User = require("../models/User")

const getUserByToken = async(token)=>{
    const decoded = jwt.verify(token,process.env.SECRET)
    const user = await User.findOne({_id: decoded.id})
    return user
}

module.exports = getUserByToken