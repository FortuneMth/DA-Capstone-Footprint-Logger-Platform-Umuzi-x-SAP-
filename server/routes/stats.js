const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { getCommunityAverage } = require("../controllers/statsController");

const router = express.Router();

router.get("/community-average", asyncHandler(getCommunityAverage));

module.exports = router;
