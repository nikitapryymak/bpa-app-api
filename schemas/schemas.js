const Joi = require("joi");

exports.AddGameSchema = Joi.object({
  date: Joi.date().required().messages({
    "date.base": "Please enter a valid date",
  }),
  opponent: Joi.string().required().messages({
    "string.base": "Opponent must be defined",
  }),
  title: Joi.string().required().messages({
    "string.base": "Please add a title for the game",
  }),
  stats: Joi.array().items(
    Joi.object({
      Last: Joi.string().required().messages({
        "string.base": "Last name must be defined",
      }),
      First: Joi.string().required().messages({
        "string.base": "First name must be defined",
      }),
      playerId: Joi.number().integer().min(0).required().messages({
        "number.base": "Failed to find player",
      }),
      PA: Joi.number().integer().min(0).required().messages({
        "number.base": "PA must be a number",
      }),
      AB: Joi.number().integer().min(0).required().messages({
        "number.base": "AB must be a number",
      }),
      H: Joi.number().integer().min(0).required().messages({
        "number.base": "H must be a number",
      }),
      "1B": Joi.number().integer().min(0).required().messages({
        "number.base": "1B must be a number",
      }),
      "2B": Joi.number().integer().min(0).required().messages({
        "number.base": "2B must be a number",
      }),
      "3B": Joi.number().integer().min(0).required().messages({
        "number.base": "3B must be a number",
      }),
      HR: Joi.number().integer().min(0).required().messages({
        "number.base": "HR must be a number",
      }),
      RBI: Joi.number().integer().min(0).required().messages({
        "number.base": "RBI must be a number",
      }),
      R: Joi.number().integer().min(0).required().messages({
        "number.base": "R must be a number",
      }),
      HBP: Joi.number().integer().min(0).required().messages({
        "number.base": "HBP must be a number",
      }),
      ROE: Joi.number().integer().min(0).required().messages({
        "number.base": "ROE must be a number",
      }),
      FC: Joi.number().integer().min(0).required().messages({
        "number.base": "FC must be a number",
      }),
      CI: Joi.number().integer().min(0).required().messages({
        "number.base": "CI must be a number",
      }),
      BB: Joi.number().integer().min(0).required().messages({
        "number.base": "BB must be a number",
      }),
      SO: Joi.number().integer().min(0).required().messages({
        "number.base": "SO must be a number",
      }),
      SB: Joi.number().integer().min(0).required().messages({
        "number.base": "SB must be a number",
      }),
      TB: Joi.number().integer().min(0).required().messages({
        "number.base": "TB must be a number",
      }),
      SAC: Joi.number().integer().min(0).required().messages({
        "number.base": "SAC must be a number",
      }),
      SF: Joi.number().integer().min(0).required().messages({
        "number.base": "SF must be a number",
      }),
      "2OUTRBI": Joi.number().integer().min(0).required().messages({
        "number.base": "2OUTRBI must be a number",
      }),
      HEADSUP: Joi.number().integer().min(0).required().messages({
        "number.base": "HEADSUP must be a number",
      }),
      BPA: Joi.number().required().messages({
        "number.base":
          "Failed to calculate Bases/PA. Please make sure all player stats are filled in",
      }),
    })
  ),
});

const ValidId = Joi.number().integer().required();

exports.AddReportSchema = Joi.object({
  catcherId: Joi.number().integer().required(),
  pitcherId: Joi.number().integer().required(),
  date: Joi.date().required(),
  FB: Joi.string().required(),
  CB: Joi.string().required(),
  SLI: Joi.string().required(),
  CU: Joi.string().required(),
  other: Joi.optional(),
});
exports.validateId = (id) => ValidId.validate(id);
