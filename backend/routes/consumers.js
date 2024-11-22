const express = require("express");
const router = express.Router();
const {
  addConsumer,
  getConsumers,
  deleteConsumer,
  checkCourtSessionsForConsumers,
} = require("../controllers/consumerControllers");

router.post("/", addConsumer);

router.get("/:id", getConsumers);

router.delete("/:id", deleteConsumer);

router.get("/sessions/:id", checkCourtSessionsForConsumers);

module.exports = router;
