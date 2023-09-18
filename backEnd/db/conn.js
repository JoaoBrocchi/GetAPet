const dotenv = require("dotenv").config()
const mongoose = require("mongoose")


async function main(){
    await mongoose.connect(process.env.URI)
    console.log("conectdao ao banco com sucesso")
}
main().catch(err=>{console.log(err)})

module.exports = mongoose;