const Joi = require("@hapi/joi");

module.exports = {
  draw: Joi.string(),
  limit: Joi.number().positive().greater(0),
  offset: Joi.number().positive().min(0),
};
