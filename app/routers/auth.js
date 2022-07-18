const router = require("express").Router();
const registerValidator = require("../http/validations/auth");
const authController = require("../http/controllers/auth.controller");
const checkValidation = require("../http/middlewares/checkValidation");
router.post(
  "/register",
  registerValidator(),
  checkValidation,
  authController.register
);
module.exports = router;
