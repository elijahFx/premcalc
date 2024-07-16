const express = require("express")
const router = express.Router()
const { addConsumer, getConsumers, deleteConsumer } = require("../controllers/consumerControllers")



router.post("/", addConsumer)

router.get("/", getConsumers)

router.delete("/:id", deleteConsumer)



module.exports = router