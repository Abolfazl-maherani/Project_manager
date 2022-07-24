const checkLogged = require("../http/middlewares/checkLogged");
const projectController = require("../http/controllers/project.controller");
const {
  createProjectValidator,
  getByIdProjectValidator,
} = require("../http/validations/project");
const { upload } = require("../http/middlewares/uploadFile");
const checkValidation = require("../http/middlewares/checkValidation");
const router = require("express").Router();
router.get("/", checkLogged, projectController.getAll);
router.post(
  "/create",
  checkLogged,
  upload.single("image"),
  createProjectValidator(),
  checkValidation,
  projectController.create
);
router.get(
  "/:id",
  checkLogged,
  getByIdProjectValidator(),
  checkValidation,
  projectController.getById
);
module.exports = router;
