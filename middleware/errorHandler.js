const AppError = require("../models/AppError");

const errorHandler = (error, req, res, next) => {
  console.log(`[Error Handler] - ${req.path}`, error);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      type: "ValidationError",
      details: error.details,
    });
  }

  if (error instanceof AppError) {
    return res.status(400).json({
      errorCode: error.errorCode,
    });
  }

  res.status(500).send("Something went wrong.");
};

module.exports = errorHandler;
