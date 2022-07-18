const { validationResult } = require("express-validator");
class AuthController {
  register(req, res, next) {
    const { email, password, confirmPassword, mobile } = req.body;
    const result = validationResult(req);
    res.json({
      mamad: "sdljf",
      result,
    });
  }
  login() {}
  forgotPassword() {}
}

module.exports = new AuthController();
