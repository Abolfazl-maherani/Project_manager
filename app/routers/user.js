const checkValidation = require("../http/middlewares/checkValidation");

const router = require("express").Router();
const userController = require("../http/controllers/user.controller");
const userValidator = require("../http/validations/user");
const { upload } = require("../http/middlewares/uploadFile");

router.get("/profile", userController.getProfile);
router.put(
  "/profile",
  upload.single("profile_image"),
  userValidator(),
  checkValidation,
  userController.editProfile
);
userController.editProfile;
router.post("/profile-image", upload.single("profile_image"));

module.exports = router;
