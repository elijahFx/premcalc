const User = require("../models/User")
const jwt = require("jsonwebtoken")


function createToken(_id) {
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: "5h"})
}

async function signupUser(req, res) {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)

    const token = createToken(user._id)

    res.status(200).json({email, token})

  } catch (error) {
    res.status(400).json({err: error.message})
  }
}

async function loginUser(req, res) {
   const { email, password } = req.body

   try {
    const user = await User.login(email, password)

    const token = createToken(user._id)

    res.status(200).json({email, token})

  } catch (error) {
    res.status(400).json({err: error.message})
  }

}

async function getUsers(req, res) {

  const users = await User.find({}).sort({createdAt: 1})

  res.status(200).json(users)

}



module.exports = {
    loginUser,
    signupUser,
    getUsers
}