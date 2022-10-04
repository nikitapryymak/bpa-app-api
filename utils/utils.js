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

exports.validator = (schema, payload) =>
  schema.validate(payload, { abortEarly: false, stripUnknown: true });

exports.verifyAdminKey = (key) => key && key === ADMIN_KEY;

exports.addTotals = (total, stat) => ({
  ...total,
  "1B": total["1B"] + parseInt(stat["1B"]),
  "2B": total["2B"] + parseInt(stat["2B"]),
  "3B": total["3B"] + parseInt(stat["3B"]),
  AB: total["AB"] + parseInt(stat["AB"]),
  BB: total["BB"] + parseInt(stat["BB"]),
  CI: total["CI"] + parseInt(stat["CI"]),
  FC: total["FC"] + parseInt(stat["FC"]),
  H: total["H"] + parseInt(stat["H"]),
  HBP: total["HBP"] + parseInt(stat["HBP"]),
  HR: total["HR"] + parseInt(stat["HR"]),
  PA: total["PA"] + parseInt(stat["PA"]),
  R: total["R"] + parseInt(stat["R"]),
  RBI: total["RBI"] + parseInt(stat["RBI"]),
  ROE: total["ROE"] + parseInt(stat["ROE"]),
  SAC: total["SAC"] + parseInt(stat["SAC"]),
  SB: total["SB"] + parseInt(stat["SB"]),
  SF: total["SF"] + parseInt(stat["SF"]),
  SO: total["SO"] + parseInt(stat["1B"]),
  TB: total["TB"] + parseInt(stat["TB"]),
  "2OUTRBI": total["2OUTRBI"] + parseInt(stat["2OUTRBI"]),
  HEADSUP: total["HEADSUP"] + parseInt(stat["HEADSUP"]),
  BPA: total["BPA"] + parseInt(stat["BPA"]),
});
