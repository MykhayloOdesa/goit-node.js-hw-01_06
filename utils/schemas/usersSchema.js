const Joi = require('joi');

const subscriptionList = ['starter', 'pro', 'business'];

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscriptionList),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptionList),
});

const verifySchema = Joi.object({
  email: Joi.string().required().messages({ 'any.required': 'missing required field email' }),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  verifySchema,
};
