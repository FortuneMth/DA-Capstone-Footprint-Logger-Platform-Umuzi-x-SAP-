const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    activityId: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["transport", "food", "energy"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    co2kg: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
