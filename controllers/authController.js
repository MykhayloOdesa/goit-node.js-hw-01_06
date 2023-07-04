const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { SECRET_KEY } = process.env;

const { Users } = require('../models/Users');
const { HttpError } = require('../utils/HttpError');
const { controllerWrapper } = require('../utils/controllerWrapper');

const avatarDir = path.join(process.cwd(), 'public', 'avatars');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (user) {
    throw new HttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await Users.create({ ...req.body, password: hashedPassword, avatarURL });

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
    throw new HttpError(401, 'Email or password is wrong');
  }

  const isPasswordCompared = await bcrypt.compare(password, user.password);

  if (!isPasswordCompared) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

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
  await Users.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json({ message: 'Successful logout' });
};

const getCurrent = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.json({ email, subscription, avatarURL });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await Users.findByIdAndUpdate(_id, { subscription }, { new: true });

  if (!user) {
    throw new HttpError(404, 'Not found');
  }

  res.json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, fileName);

  await fs.rename(tempUpload, resultUpload);

  Jimp.read(resultUpload, (error, image) => {
    if (error) throw error;

    image.resize(250, 250).write(resultUpload);
  });

  const avatarURL = path.join('avatars', fileName);
  await Users.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  getCurrent: controllerWrapper(getCurrent),
  updateSubscription: controllerWrapper(updateSubscription),
  updateAvatar: controllerWrapper(updateAvatar),
};
