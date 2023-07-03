const express = require('express');

const { authenticate } = require('../../middlewares/authenticate');
const { upload } = require('../../middlewares/upload');
const { validateBody } = require('../../utils/validateBody');

const {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
} = require('../../controllers/authController');

const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require('../../utils/schemas/usersSchema');

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

router.post('/login', validateBody(loginSchema), login);

router.post('/logout', authenticate, logout);

router.get('/current', authenticate, getCurrent);

router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

router.patch('/', authenticate, validateBody(updateSubscriptionSchema), updateSubscription);

module.exports = { authRouter: router };
