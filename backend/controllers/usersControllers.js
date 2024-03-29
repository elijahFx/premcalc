const User = require("../models/User")
const jwt = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary")
const mongoose = require("mongoose")


function createToken(_id) {
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: "5h"})
}

async function editUser(req, res) {
  const { id } = req.params
  const { image, name } = req.body

  if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({err: "Нет такого пользователя"})
  }


  try {
    if(image || name) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "avatars"
      })

      if(uploadResponse || name) {
        const USER = await User.findOneAndUpdate({_id: id}, {
          ...req.body
      })

      if(!USER) {
        return res.status(404).json({err: "Нет такого пользователя"})
    }
  
    res.status(200).json(USER)
  }}
  if(!image && !name) {
    return res.status(400).json({ err: "Пожалуйста, укажите имя или изображение" })
  }
   
  } catch (error) {
    console.log(error);
    res.status(500).json({err: error.message})
  }
}

async function signupUser(req, res) {
  const { email, password, role } = req.body

  try {
    const user = await User.signup(email, password, role)

    const token = createToken(user._id)

    res.status(200).json({email, token, role, id: user._id, name: user.name})

  } catch (error) {
    console.log(`ЭТО ТУУУУТ!`);
    res.status(400).json({err: error.message})
  }
}

async function loginUser(req, res) {
   const { email, password } = req.body

   try {
    const user = await User.login(email, password)

    const token = createToken(user._id)

    res.status(200).json({email, token, role: user.role, id: user._id, name: user.name, image: user.image})

  } catch (error) {
    res.status(400).json({err: error.message})
  }

}

async function getUsers(req, res) {

  const users = await User.find({}).sort({createdAt: 1})
  console.log(users)
  res.status(200).json(users)

}



module.exports = {
    loginUser,
    signupUser,
    getUsers,
    editUser
}