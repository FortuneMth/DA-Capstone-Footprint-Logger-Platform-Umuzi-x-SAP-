const Activity = require("../models/Activity");
const { sendSuccess, sendError } = require("../utils/response");

function toClient(activity) {
  return {
    id: activity._id.toString(),
    activityId: activity.activityId,
    label: activity.label,
    category: activity.category,
    qty: activity.quantity,
    co2: activity.co2kg,
    date: activity.date,
    note: activity.note || "",
  };
}

async function getActivities(req, res) {
  const activities = await Activity.find({ userId: req.user.id }).sort({
    date: 1,
    createdAt: 1,
  });
  return sendSuccess(res, activities.map(toClient), "Activities loaded");
}

async function createActivity(req, res) {
  const { activityId, label, category, quantity, co2kg, date, note } = req.body;
  if (
    !activityId ||
    !label ||
    !category ||
    !date ||
    Number.isNaN(Number(quantity)) ||
    Number(quantity) <= 0 ||
    Number.isNaN(Number(co2kg)) ||
    Number(co2kg) < 0
  ) {
    return sendError(res, "Missing or invalid activity fields", 400);
  }

  const created = await Activity.create({
    userId: req.user.id,
    activityId,
    label,
    category,
    quantity: Number(quantity),
    co2kg: Number(co2kg),
    date,
    note: note || "",
  });

  return sendSuccess(res, toClient(created), "Activity created", 201);
}

async function deleteActivity(req, res) {
  const deleted = await Activity.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!deleted) {
    return sendError(res, "Activity not found", 404);
  }

  return sendSuccess(res, null, "Activity deleted");
}

module.exports = {
  getActivities,
  createActivity,
  deleteActivity,
};
