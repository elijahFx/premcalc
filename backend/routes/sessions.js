const express = require("express")
const router = express.Router()
const { addSession, getSessions, deleteSession } = require("../controllers/sessionControllers")



router.post("/", addSession)

router.get("/:id", getSessions)

router.delete("/:id", deleteSession)



module.exports = router