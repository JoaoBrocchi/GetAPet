const express = require("express")
const petController = require("../controllers/petController.js")
const verifyToken = require("../helpers/verifyToken.js")
const imageUpload = require("../helpers/image-upload.js")

petRouter = express.Router()

petRouter.route("/createpet")
    .post(verifyToken,imageUpload.array("images"),petController.createPet)
petRouter.route("/")
    .get(petController.getAll)
petRouter.route("/mypets")
    .get(verifyToken,petController.getAllUserPets)

petRouter.route("/myadoptions")
    .get(verifyToken,petController.getAllUserAdoptions)



petRouter.route("/:id")
    .get(petController.getPetById)
    .delete(verifyToken,petController.deletePet)
    .patch(verifyToken,imageUpload.array("images"),petController.updatePet)
petRouter.route("/schedule/:id")   
    .patch(verifyToken,petController.schedule)
petRouter.route("/conclude/:id")   
    .patch(verifyToken,petController.concludeAdoption)

module.exports = petRouter;
