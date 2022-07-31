const assert = require("assert");
const { ADMIN_KEY } = require("../constants/envVariables");
const AppError = require("../models/AppError");

exports.tryCatch = (controller) => async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (error) {
    // pass error on
    next(error);
  }
};

exports.assertCondition = (condition, code, message) =>
  assert(condition, new AppError(code, message));

exports.validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false, stripUnknown: true });

exports.verifyAdminKey = (key) => key && key === ADMIN_KEY;
