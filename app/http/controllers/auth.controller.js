class AuthController {
  register(req, res, next) {
    const { email, password, confirmPassword, mobile } = req.body;
  }
  login() {}
  forgotPassword() {}
}

module.exports = new AuthController();
