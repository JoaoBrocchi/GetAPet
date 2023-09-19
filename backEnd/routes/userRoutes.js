const express = require("express")
const UserController = require("../controllers/userController.js")
const verifyToken = require("../helpers/verifyToken.js")
const imageUpload = require("../helpers/image-upload.js")

const userRouter = express.Router()

userRouter.route("/register")
    // .get(UserController.register)
    .post(UserController.userRegister)

userRouter.route("/login")
    .post(UserController.login)

userRouter.route("/checkuser")
    .get(UserController.checkUser)

userRouter.route("/:id")
    .get(UserController.getUserById)

userRouter.route("/edit/:id")
    .patch(verifyToken,imageUpload.single("image"),UserController.editUser)

module.exports = userRouter