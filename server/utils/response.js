function sendSuccess(res, data, message = "OK", statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
}

function sendError(res, message = "Request failed", statusCode = 500, details = null) {
  return res.status(statusCode).json({
    success: false,
    data: details,
    message,
  });
}

module.exports = {
  sendSuccess,
  sendError,
};
