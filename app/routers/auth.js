const router = require("express").Router();
const {
  registerValidator,
  loginValidator,
} = require("../http/validations/auth");
const authController = require("../http/controllers/auth.controller");
const checkValidation = require("../http/middlewares/checkValidation");

// Register
router.post(
  "/register",
  registerValidator(),
  checkValidation,
  authController.register
);

// Login
router.post("/login", loginValidator(), checkValidation, authController.login);
module.exports = router;
