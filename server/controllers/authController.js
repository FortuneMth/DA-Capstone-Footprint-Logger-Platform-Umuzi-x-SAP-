const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { sendSuccess, sendError } = require("../utils/response");

function signToken(user) {
  return jwt.sign(
    { userId: user._id.toString(), username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function sanitizeUser(user) {
  return {
    id: user._id,
    username: user.username,
    joinedDate: user.joinedDate,
    weeklyGoal: user.weeklyGoal,
  };
}

async function register(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return sendError(res, "Username and password are required", 400);
  }

  const cleanUsername = String(username).trim();
  if (cleanUsername.length < 3 || String(password).length < 6) {
    return sendError(res, "Username must be 3+ chars and password 6+ chars", 400);
  }

  const existing = await User.findOne({ username: cleanUsername });
  if (existing) {
    return sendError(res, "Username already taken", 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ username: cleanUsername, passwordHash });
  const token = signToken(user);

  return sendSuccess(
    res,
    { token, user: sanitizeUser(user) },
    "Account created",
    201
  );
}

async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return sendError(res, "Username and password are required", 400);
  }

  const user = await User.findOne({ username: String(username).trim() });
  if (!user) {
    return sendError(res, "Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return sendError(res, "Invalid credentials", 401);
  }

  const token = signToken(user);
  return sendSuccess(res, { token, user: sanitizeUser(user) }, "Login successful");
}

module.exports = {
  register,
  login,
};
