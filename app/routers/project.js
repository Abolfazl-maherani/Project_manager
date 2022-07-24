const checkLogged = require("../http/middlewares/checkLogged");
const projectController = require("../http/controllers/project.controller");
const projectValidator = require("../http/validations/project");
const { upload } = require("../http/middlewares/uploadFile");
const checkValidation = require("../http/middlewares/checkValidation");
const router = require("express").Router();
router.post(
  "/create",
  checkLogged,
  upload.single("image"),
  projectValidator(),
  checkValidation,
  projectController.create
);
module.exports = router;
