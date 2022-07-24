const projectController = require("../http/controllers/project.controller");
const {
  createProjectValidator,
  getByIdProjectValidator,
} = require("../http/validations/project");
const { upload } = require("../http/middlewares/uploadFile");
const checkValidation = require("../http/middlewares/checkValidation");
const router = require("express").Router();
router.get("/", projectController.getAll);
router.post(
  "/create",
  upload.single("image"),
  createProjectValidator(),
  checkValidation,
  projectController.create
);
router.get(
  "/:id",
  getByIdProjectValidator(),
  checkValidation,
  projectController.getById
);
router.delete(
  "/:id",
  getByIdProjectValidator(),
  checkValidation,
  projectController.remove
);
module.exports = router;
