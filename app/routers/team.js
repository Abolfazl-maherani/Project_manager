const teamController = require("../http/controllers/team.controller");
const checkValidation = require("../http/middlewares/checkValidation");
const {
  createTeamValidator,
  getByIdValidator,
} = require("../http/validations/team");

const router = require("express").Router();

router.post(
  "/",
  createTeamValidator(),
  checkValidation,
  teamController.create,
  teamController.sendRequestforInvit
);

router.get("/:id", getByIdValidator(), checkValidation, teamController.getById);
module.exports = router;
