const express = require("express")
const router = express.Router()
const { signupUser, loginUser, getUsers, editUser } = require("../controllers/usersControllers")

router.post("/login", loginUser)

router.post("/signup", signupUser)

router.patch("/:id", editUser)

router.get("/", getUsers)


module.exports = router