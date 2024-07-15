const express = require("express")
const router = express.Router()
const { addConsumer, getConsumers } = require("../controllers/consumerControllers")



router.post("/", addConsumer)

router.get("/", getConsumers)



module.exports = router