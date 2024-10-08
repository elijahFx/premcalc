const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const roleOptions = ["worker", "admin", "employer"]
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
    },
    role: {
        type: String,
        required: true,
        enum: roleOptions
    },
    name: {
        type: String,
        unique: true
    },
    image: {
        type: Object,
        default: null
    },
    oklad: {
        type: Number,
        default: 626
    },
    statistics: [{
        date: {
            type: String,
            required: true
        },
        money: {
            type: Number,
            required: true
        }
    }]
})

userSchema.statics.signup = async function(email, password, role) {
    if(!email || !password) {
        throw Error("Все поля должны быть заполнены")
    }


    const exists = await this.findOne({ email })

    if(exists) {
        throw Error("Этот email уже существует")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash, role})

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
    console.log(user);
    return user


}

module.exports = mongoose.model("User", userSchema)