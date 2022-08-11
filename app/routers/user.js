const checkValidation = require("../http/middlewares/checkValidation");

const router = require("express").Router();
const userController = require("../http/controllers/user.controller");
const {
  userValidator,
  acceptInvite,
  getInvitesValidation,
} = require("../http/validations/user");
const { upload } = require("../http/middlewares/uploadFile");
const { getInvites } = require("../http/controllers/user.controller");

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
router.get(
  "/invites",
  getInvitesValidation(),
  checkValidation,
  userController.getInvites
);
router.patch(
  "/acceptInvite/:id",
  acceptInvite(),
  checkValidation,
  userController.acceptInviteInTeam
);

//TODO: Change name validator the validators are common
router.patch(
  "/rejectInvite/:id",
  acceptInvite(),
  checkValidation,
  userController.rejectInviteInTeam
);
module.exports = router;
