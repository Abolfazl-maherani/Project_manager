const checkLogged = require("../http/middlewares/checkLogged");
const checkValidation = require("../http/middlewares/checkValidation");

const router = require("express").Router();
const userController = require("../http/controllers/user.controller");
const userValidator = require("../http/validations/user");
router.get("/profile", checkLogged, userController.getProfile);
router.put(
  "/profile",
  checkLogged,
  userValidator(),
  checkValidation,
  userController.editProfile
);
module.exports = router;
