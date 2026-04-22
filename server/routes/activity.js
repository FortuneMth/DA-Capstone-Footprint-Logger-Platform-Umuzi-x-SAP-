const express = require("express");
const auth = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const {
  getActivities,
  createActivity,
  deleteActivity,
} = require("../controllers/activityController");

const router = express.Router();

router.get("/", auth, asyncHandler(getActivities));
router.post("/", auth, asyncHandler(createActivity));
router.delete("/:id", auth, asyncHandler(deleteActivity));

module.exports = router;
