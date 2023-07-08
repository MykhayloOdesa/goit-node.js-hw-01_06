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
  verificationToken,
  verify,
} = require('../../controllers/authController');

const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  verifySchema,
} = require('../../utils/schemas/usersSchema');

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

router.post('/login', validateBody(loginSchema), login);

router.post('/logout', authenticate, logout);

router.get('/current', authenticate, getCurrent);

router.patch('/avatars', authenticate, upload.single('avatarURL'), updateAvatar);

router.patch('/', authenticate, validateBody(updateSubscriptionSchema), updateSubscription);

router.get('/verify/:verificationToken', verificationToken);

router.post('/verify', validateBody(verifySchema), verify);

module.exports = { authRouter: router };
