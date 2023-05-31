const { HttpError } = require("./middlewares/HttpError");

const validateBody = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(new HttpError(422, { message: "missing required name field" }));
      return;
    }

    next();
  };
};

module.exports = { validateBody };
