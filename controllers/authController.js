const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { Users } = require("../models/Users");
const { HttpError } = require("../utils/HttpError");
const { controllerWrapper } = require("../utils/controllerWrapper");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (user) {
    throw new HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await Users.create({ ...req.body, password: hashedPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (!user) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const passwordCompared = await bcrypt.compare(password, user.password);

  if (!passwordCompared) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await Users.findByIdAndUpdate(user._id, { token });

  res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await Users.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new HttpError(422, "Missing subscription field");
  }

  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await Users.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  if (!user) {
    throw new HttpError(404, "Not found");
  }

  res.json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  getCurrent: controllerWrapper(getCurrent),
  updateSubscription: controllerWrapper(updateSubscription),
};
