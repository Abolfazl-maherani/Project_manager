const { userModel } = require("../../models/user");
const { hashString } = require("../../modules/function");
class AuthController {
  async register(req, res, next) {
    try {
      const { username, email, password, mobile } = req.body;
      const hash_password = hashString(password);
      const result = await userModel.create({
        username,
        email,
        password: hash_password,
        mobile,
      });
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  login() {}
  forgotPassword() {}
}

module.exports = new AuthController();
