const Case = require("../models/Case")
const mongoose = require("mongoose")
const schedule = require('node-schedule')


const createCase = async (req, res) => {
    const { name, expenses, takes, myTakes, number, isPaid } = req.body
    const user_id = req.user._id

    try {
        const CASE = await Case.create({ name, expenses, takes, myTakes, number, isPaid, user_id })
        console.log(CASE);
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

const deleteCase2 = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({err: "Нет такого дела"})
    }

    const CASE = await Case.findById(id);

    if(!CASE) {
        return res.status(404).json({err: "Нет такого дела"})
    }

    // Mark the case as deleted and set the deleteAt time
    CASE.isDeleted = true;
    CASE.deleteAt = new Date(Date.now() + 24*60*60*1000); // 24 hours later
    await CASE.save();

    const deleteAt = CASE.deleteAt;
    console.log(deleteAt);

    // Schedule the deletion job
    const job = schedule.scheduleJob(deleteAt, function () {
        Case.deleteOne({ _id: CASE._id }, function (err) {
            if (err) {console.log(`Ошибка у NODE SCHEDULERERAAAA${err}`)}
            console.log("Case deleted.");
        });
    });

    const deleteJobPrereq = job.name.toString()
    CASE.deleteJob = deleteJobPrereq
    await CASE.save();

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

const getAllCases = async (req, res) => {
    const cases = await Case.find({}).sort({createdAt: 1})

    res.status(200).json(cases)
}

const deleteAllPaidCases = async (req, res) => {
    const user_id = req.user._id;

    try {
        const deletedCases = await Case.deleteMany({ user_id, isPaid: true });
        res.status(200).json(deletedCases);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete paid cases." });
    }
}



module.exports = {
    createCase,
    deleteCase,
    updateCase,
    getCases,
    getAllCases,
    deleteCase2,
    deleteAllPaidCases
}