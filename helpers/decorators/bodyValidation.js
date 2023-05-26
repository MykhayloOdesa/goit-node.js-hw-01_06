const { globalErrorHandler } = require("../../middlewares/globalErrorHandler");

const validateBody = (schema) => {
  const func = (request, response, next) => {
    const { error } = schema.validate(request.body);
    if (error) {
      next(globalErrorHandler());
    }
    next();
  };

  return func;
};

module.exports = validateBody;
