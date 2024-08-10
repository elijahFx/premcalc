const User = require("../models/User")
const jwt = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")


function createToken(_id) {
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: "5h"})
}

async function editUser(req, res) {
  const { id } = req.params
  const { image, name, userOklad } = req.body

  if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({err: "Нет такого пользователя"})
  }


  try {

    if(!image && !name && userOklad) {
      const USER = await User.findOneAndUpdate({_id: id}, {
        oklad: userOklad
    })
  
    res.status(200).json(USER)
  
  }

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
  if(!image && !name && !userOklad) {
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

    res.status(200).json({email, token, role, id: user._id, name: user.name, userOklad: user.oklad})

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

    res.status(200).json({email, token, role: user.role, id: user._id, name: user.name, image: user.image, userOklad: user.oklad})

  } catch (error) {
    res.status(400).json({err: error.message})
  }

}

async function getUsers(req, res) {

  const users = await User.find({}).sort({createdAt: 1})
  console.log(users)
  res.status(200).json(users)

}

async function forgotPassword(req, res) {
  const { email } = req.body


  try {
    console.log(email);
    const oldUser = await User.findOne({ email })

    if(!oldUser) {
      res.status(400).json({err: `Нет такого пользователя`})
    }

    

    
    const secret = process.env.SECRET + oldUser.password

    const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn: "10m"}) 
    
    const link = `https://premcalc.netlify.app/reset-password/${oldUser._id}/${token}`

    const isName = oldUser.name ? true : false 


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'layz6644@gmail.com',
        pass: 'vkxyzpjufsrhnoub'
      }
    });
    
    const mailOptions = {
      from: 'layz6644@gmail.com',
      to: `${email}`,
      subject: 'Восстановление пароля на сайте premcalc.by',
      html:  `
      <p>Добрый день${isName ? `, ${oldUser.name}` : ''}. Нам поступила информация о том, что Вам необходим новый пароль. Для того, чтобы установить новый пароль для Вашего аккаунта, перейдите по следующей ссылке - <a href="${link}">${link}</a>.</p>
      <p>Если Вы не пытались изменить пароль на Вашем аккаунте, то свяжитесь с Глебом для установелния личности хакера и его максимального наказания в соответствии со всей строгостью закона!</p>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfR-dNWYQwPNH7hw5y9Hovzu04o_DeFZGjOw&s" alt="Изображение" style="max-width: 100%; height: auto;" />
      <p>- С уважением, Кудесников Глеб Константинович</p>
    `
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });




  } catch (error) {
    console.log(`ЭТО ТУУУУТ!`);
    res.status(400).json({err: error.message})
  }
}

async function resetPassword(req, res) {
  const { id, token } = req.params

  const oldUser = await User.findOne({ _id: id })

    if(!oldUser) {
      res.status(400).json({err: `Нет такого пользователя`})
    }

    const secret = process.env.SECRET + oldUser.password

    try {
      const verify = jwt.verify(token, secret)
      res.status(200).json(verify)
      if(verify) {
        console.log("verified");
      }
    } catch (error) {
      res.status(400).json({err: error.message})
    }

  
}

async function resetPassword2(req, res) {
  const { password, id, token } = req.body

  const oldUser = await User.findOne({ _id: id })

    if(!oldUser) {
      res.status(400).json({err: `Нет такого пользователя`})
    }

    const secret = process.env.SECRET + oldUser.password

    try {
      const verify = jwt.verify(token, secret)
      console.log(password);
      const encryptedPassword = await bcrypt.hash(password, 10)
      const updatedUser = await User.updateOne({ _id: id }, { $set: {password: encryptedPassword}})
      res.status(200).json({res: `Пароль изменен`})
    } catch (error) {
      res.status(400).json({err: `Пароль не сменился`})
    }

  
}



module.exports = {
    loginUser,
    signupUser,
    getUsers,
    editUser,
    forgotPassword,
    resetPassword,
    resetPassword2
}