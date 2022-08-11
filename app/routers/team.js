const teamController = require("../http/controllers/team.controller");
const checkValidation = require("../http/middlewares/checkValidation");
const {
  createTeamValidator,
  getByIdValidator,
  removeByIdValidator,
} = require("../http/validations/team");

const router = require("express").Router();

router.post(
  "/",
  createTeamValidator(),
  checkValidation,
  teamController.create,
  teamController.sendRequestforInvit
);
router.get(
  "/:id",
  removeByIdValidator(),
  checkValidation,
  teamController.getById
);
router.delete(
  "/:id",
  getByIdValidator(),
  checkValidation,
  teamController.removeById
);
module.exports = router;
