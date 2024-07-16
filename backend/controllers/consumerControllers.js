const Consumer = require("../models/Consumer")
const mongoose = require("mongoose")



const addConsumer = async (req, res) => {
    const newConsumer = req.body
    
    const consumerToAdd = new Consumer(newConsumer);
    await consumerToAdd.save();
      
    
    res.status(200).json({ added: consumerToAdd });
}

const getConsumers = async (req, res) => {
    const consumers = await Consumer.find({}).sort({createdAt: 1})
    res.status(200).json(consumers)
}

const deleteConsumer = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({err: "Нет такого потребителя"})
    }

    const consumer = await Consumer.findOneAndDelete({ _id: id})

    if(!consumer) {
        return res.status(404).json({err: "Нет такого потребителя"})
    }

    res.status(200).json(consumer)

}


module.exports = {
    addConsumer,
    getConsumers,
    deleteConsumer
}