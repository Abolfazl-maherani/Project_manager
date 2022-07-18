const { validationResult } = require("express-validator");
class AuthController {
  register(req, res, next) {
    const { email, password, confirmPassword, mobile } = req.body;
    const result = validationResult(req);
    res.json({
      result,
    });
  }
  login() {}
  forgotPassword() {}
}

module.exports = new AuthController();
