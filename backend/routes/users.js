const express = require("express")
const router = express.Router()
const { signupUser, loginUser, getUsers } = require("../controllers/usersControllers")

router.post("/login", loginUser)

router.post("/signup", signupUser)

router.get("/", getUsers)


module.exports = router