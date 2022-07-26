const teamController = require("../http/controllers/team.controller");
const checkValidation = require("../http/middlewares/checkValidation");
const { createTeamValidator } = require("../http/validations/team");

const router = require("express").Router();

router.post("/", createTeamValidator(), checkValidation, teamController.create);
module.exports = router;
