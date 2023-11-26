const express = require("express")
const Case = require("../models/Case")
const {
    createCase,
    deleteCase,
    updateCase,
    getCases
} = require("../controllers/casesControllers")

const router = express.Router()

router.get("/", getCases)

router.post("/", createCase)

router.delete("/:id", deleteCase)

router.patch("/:id", updateCase)

module.exports = router