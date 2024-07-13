const express = require("express")
const router = express.Router()
const { addSession, getSessions } = require("../controllers/sessionControllers")



router.post("/", addSession)

router.get("/", getSessions)



module.exports = router