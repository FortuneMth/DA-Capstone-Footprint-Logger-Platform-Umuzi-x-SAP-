const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    weeklyGoal: {
      type: Number,
      default: 16.65,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
