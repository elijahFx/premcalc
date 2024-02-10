const express = require("express")
const Case = require("../models/Case")
const {
    createCase,
    deleteCase,
    updateCase,
    getCases,
    getAllCases
} = require("../controllers/casesControllers")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

router.use(requireAuth)

router.get("/", getCases)

router.post("/", createCase)

router.get("/all", getAllCases)

router.delete("/:id", deleteCase)

router.patch("/:id", updateCase)

module.exports = router