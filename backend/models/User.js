const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function(email, password) {
    if(!email || !password) {
        throw Error("Все поля должны быть заполнены")
    }


    const exists = await this.findOne({ email })

    if(exists) {
        throw Error("Этот email уже существует")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user
}

userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error("Все поля должны быть заполнены")
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw Error("Неправильный email")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error("Неправильный пароль")
    }

    return user


}

module.exports = mongoose.model("User", userSchema)