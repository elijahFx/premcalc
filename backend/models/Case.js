const mongoose = require("mongoose")


const Schema = mongoose.Schema

const caseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    expenses: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    },
    takes: {
        type: Number,
        required: true
    },
    myTakes: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Case", caseSchema)