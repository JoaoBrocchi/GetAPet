const { Error } = require("mongoose")
const multer = require("multer")
const path = require("path")

const imageStorege = multer.diskStorage({
    destination: (req,file,cb)=>{
        let folder
        if (req.baseUrl.includes("user")){
            folder = "users"
        }else if(req.baseUrl.includes("pet")){
            folder = "pets"
        }
        cb(null,`public/images/${folder}`)
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+ String(math.random()*1000)+ path.extname(file.originalname))
        
    }
})
const imageUpload = multer({
    storage: imageStorege,
    fileFilter:(req,file,cb)=>{
        if (file.originalname.match(/\.(png\jpg)$/)){
            return cb(new Error("por favor envie um apenas JPG ou PNG"))
        }
        cb(undefined,true)
    }
})
module.exports = imageUpload