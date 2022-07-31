const assert = require("assert");

class AppError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.errorCode = errorCode;
  }
}

module.exports = AppError;
