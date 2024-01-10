const Joi = require("joi");

const createDeedSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(15).max(30).required(),
  isGlobal: Joi.boolean(),
});

module.exports = {
  createDeedSchema,
};
