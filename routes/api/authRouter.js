const express = require("express");

const { authenticate } = require("../../middlewares/authenticate");
const { validateBody } = require("../../utils/validateBody");

const {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
} = require("../../controllers/authController");

const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require("../../utils/schemas/usersSchema");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, getCurrent);

router.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscription
);

module.exports = { authRouter: router };
