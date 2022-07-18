class AuthController {
  register(req, res, next) {
    const { email, password, confirmPassword, mobile } = req.body;
    res.send("ok");
  }
  login() {}
  forgotPassword() {}
}

module.exports = new AuthController();
