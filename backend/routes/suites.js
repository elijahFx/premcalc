const express = require("express")
const router = express.Router()
const { makeSuite, deleteAllSuites } = require("../controllers/suitesControllers")

router.post("/", makeSuite)

router.delete("/", deleteAllSuites)


module.exports = router