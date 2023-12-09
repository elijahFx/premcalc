const Case = require("../models/Case")
const mongoose = require("mongoose")


const createCase = async (req, res) => {
    const { name, expenses, takes, myTakes, number, isPaid } = req.body
    const { user_id } = req.user._id

    try {
        const CASE = await Case.create({ name, expenses, takes, myTakes, number, isPaid, user_id })
        res.status(200).json(CASE)
    } catch (error) {
        res.status(400).json({err: `То что ты просил...${req.user}`})
    }
}

// Сделать все внизу

const deleteCase = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({err: "Нет такого дела"})
    }

    const CASE = await Case.findOneAndDelete({ _id: id})

    if(!CASE) {
        return res.status(404).json({err: "Нет такого дела"})
    }

    res.status(200).json(CASE)
}

const updateCase = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({err: "Нет такого дела"})
    }

    const CASE = await Case.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!CASE) {
        return res.status(404).json({err: "Нет такого дела"})
    }

    res.status(200).json(CASE)
}

const getCases = async (req, res) => {
    const user_id = req.user._id

    console.log(user_id);

    const cases = await Case.find({ user_id }).sort({createdAt: 1})

    res.status(200).json(cases)
}

module.exports = {
    createCase,
    deleteCase,
    updateCase,
    getCases
}