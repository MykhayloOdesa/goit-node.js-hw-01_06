const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { Users } = require("../models/Users");
const { HttpError } = require("../utils/HttpError");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(new HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await Users.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(new HttpError(401, "Not authorized"));
    }

    req.user = user;

    next();
  } catch {
    next(new HttpError(401));
  }
};

module.exports = { authenticate };
