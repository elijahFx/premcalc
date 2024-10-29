const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    liabelee: {
      type: String,
    },
    judge: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    courtRoom: {
      type: String,
    },
    type: {
      type: String,
    },
    court: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
    },
    caseNum: {
      type: String,
    },
    caseType: {
      type: String,
      required: true,
      default: "civil",
      enum: ["civil", "administrative", "criminal"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
