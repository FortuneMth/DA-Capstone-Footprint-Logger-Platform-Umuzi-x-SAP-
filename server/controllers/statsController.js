const Activity = require("../models/Activity");
const { sendSuccess } = require("../utils/response");

function weekStartDate() {
  const now = new Date();
  const copy = new Date(now);
  copy.setDate(now.getDate() - now.getDay());
  return copy.toISOString().split("T")[0];
}

async function getCommunityAverage(_req, res) {
  const weekStart = weekStartDate();
  const grouped = await Activity.aggregate([
    { $match: { date: { $gte: weekStart } } },
    {
      $group: {
        _id: "$userId",
        weeklyTotal: { $sum: "$co2kg" },
      },
    },
    {
      $group: {
        _id: null,
        avgWeeklyCO2: { $avg: "$weeklyTotal" },
      },
    },
  ]);

  const avg = grouped[0]?.avgWeeklyCO2 || 0;
  return sendSuccess(
    res,
    { averageWeeklyCO2: Number(avg.toFixed(2)) },
    "Community average loaded"
  );
}

module.exports = {
  getCommunityAverage,
};
