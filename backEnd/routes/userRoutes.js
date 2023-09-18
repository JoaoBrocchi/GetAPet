const express = require("express")
const UserController = require("../controllers/userController.js")

const userRouter = express.Router()

userRouter.route("/register")
    // .get(UserController.register)
    .post(UserController.userRegister)

userRouter.route("/login")
    .post(UserController.login)

userRouter.route("/checkuser")
    .get(UserController.checkUser)
module.exports = userRouter