const { logError } = require("../../logger/logger");

module.exports = (error, req, res, next) => {
  logError(error.message);
  res.status(400).json({
    name: error.name,
    error: error.message
  });
};
