const express = require("express")
const router = express.Router()
const { signupUser, loginUser, getUsers, editUser, forgotPassword, resetPassword, resetPassword2 } = require("../controllers/usersControllers")

router.post("/login", loginUser)

router.post("/signup", signupUser)

router.post("/forgot-password", forgotPassword)

router.get("/reset-password/:id/:token", resetPassword)

router.post("/reset-password/:id/:token", resetPassword2)

router.patch("/:id", editUser)

router.get("/", getUsers)


module.exports = router