const { userModel } = require("../../models/user");
const {
  hashString,
  equalStringToHash,
  generateToken,
  validateTokne,
} = require("../../modules/function");
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
  async login(req, res, next) {
    try {
      if ("authorization" in req.headers) {
        const { authorization: token } = req.headers;
        if (validateTokne(token, true))
          throw {
            message: "شما در سیستم  لاگین هستید و نیاز به لاگین مجدد نیست.",
            status: 302,
            success: false,
          };
      }

      const { username, password } = req.body;
      const user = await userModel.findOne({ username });
      if (!user)
        throw { status: 401, message: "نام کاربری یا رمز عبور اشتباه است" };
      const { password: hashPassword } = user;
      if (!equalStringToHash(password, hashPassword))
        throw { message: "نام کاربری یا رمز عبور اشتباه است", status: 401 };
      const token = generateToken(user);
      if (!token) throw { status: 500, message: "خطای ناشناخته سرور" };
      res.json({
        status: 200,
        success: true,
        message: "با موفقیت وارد سیستم شدید",
        token,
      });
    } catch (error) {
      next(error);
    }
  }
  forgotPassword() {}
}

module.exports = new AuthController();
