const express = require("express")
const router = express.Router()
const { addConsumer, getConsumers, deleteConsumer, checkCourtSessionsForConsumers } = require("../controllers/consumerControllers")



router.post("/", addConsumer)

router.get("/", getConsumers)

router.delete("/:id", deleteConsumer)

router.get("/:id", checkCourtSessionsForConsumers)



module.exports = router