const express = require("express")
const router = express.Router()
const { signupUser, loginUser, getUsers, editUser, forgotPassword, resetPassword } = require("../controllers/usersControllers")

router.post("/login", loginUser)

router.post("/signup", signupUser)

router.post("/forgot-password", forgotPassword)

router.get("/reset-password/:id/:token", resetPassword)

router.patch("/:id", editUser)

router.get("/", getUsers)


module.exports = router