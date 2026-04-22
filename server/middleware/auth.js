const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/response");

module.exports = function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return sendError(res, "Missing authorization token", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, username: decoded.username };
    return next();
  } catch (_error) {
    return sendError(res, "Invalid or expired token", 401);
  }
};
