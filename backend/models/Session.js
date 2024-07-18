const mongoose = require("mongoose")


const Schema = mongoose.Schema

const sessionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    liabelee: {
        type: String,
        required: true
    },
    judge: {
        type: String,
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    courtRoom: {
        type: String,
    },
    type: {
        type: String,
    },
    court: {
        type: String,
        required: true
    },
    user_id: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model("Session", sessionSchema)