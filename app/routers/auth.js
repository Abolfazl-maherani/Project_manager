const router = require("express").Router();
const registerValidator = require("../http/validations/auth");
const authController = require("../http/controllers/auth.controller");

router.post("/register", registerValidator(), authController.register);
module.exports = router;
