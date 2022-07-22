const checkLogged = require("../http/middlewares/checkLogged");
const checkValidation = require("../http/middlewares/checkValidation");

const router = require("express").Router();
const userController = require("../http/controllers/user.controller");
const userValidator = require("../http/validations/user");
const { upload } = require("../http/middlewares/uploadFile");

router.get("/profile", checkLogged, userController.getProfile);
router.put(
  "/profile",
  checkLogged,
  upload.single("profile_image"),
  userValidator(),
  checkValidation,
  userController.editProfile
);
userController.editProfile;
router.post("/profile-image", checkLogged, upload.single("profile_image"));

module.exports = router;
