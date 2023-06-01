const Joi = require("joi");

const contactsAddingSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object()
  .keys({
    name: contactsAddingSchema.extract("name").optional(),
    email: contactsAddingSchema.extract("email").optional(),
    phone: contactsAddingSchema.extract("phone").optional(),
    favorite: contactsAddingSchema.extract("favorite").optional(),
  })
  .or("name", "email", "phone", "favorite");

module.exports = {
  contactsAddingSchema,
  updateContactSchema,
};
