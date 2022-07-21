const { userModel } = require("../../models/user");
const { validateTokne } = require("../../modules/function");

const checkLogged = async (req, res, next) => {
  try {
    const commonError = {
      message: "مجوز دسترسی ندارید لطفا لاگین کنید.",
      status: 403,
      success: false,
    };
    if (!("authorization" in req.headers)) throw commonError;
    const { authorization: token } = req.headers;
    if (!validateTokne(token)) throw commonError;
    const { username } = validateTokne(token);
    const user = await userModel.findOne({ username }, { password: false });
    if (!user) throw commonError;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = checkLogged;
