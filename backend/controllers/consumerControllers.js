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


module.exports = {
    addConsumer,
    getConsumers
}