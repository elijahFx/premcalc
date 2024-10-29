const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const consumerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    courtId: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
    },
    allCourts: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
      default: "civil",
      enum: ["civil", "administrative", "criminal"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consumer", consumerSchema);
