const express = require("express")
const Case = require("../models/Case")
const {
    createCase,
    deleteCase,
    updateCase,
    getCases,
    getAllCases,
    deleteCase2,
    deleteAllPaidCases
} = require("../controllers/casesControllers")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

router.use(requireAuth)

router.get("/", getCases)

router.post("/", createCase)

router.get("/all", getAllCases)

router.delete("/deleteall", deleteAllPaidCases)

router.delete("/:id", deleteCase)

router.delete("/trashbin/:id", deleteCase2)

router.patch("/:id", updateCase)

module.exports = router