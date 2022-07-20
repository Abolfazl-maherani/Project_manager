//TODO : Research for can optimization unique check
const { body } = require("express-validator");
const { userModel } = require("../../models/user");

//Regix match for validation
const USERNAME_REGEXP = {
  match: /^[a-zA-Z][a-zA-Z1-9\.\_]*$/,
  msg: "نام کاربری باید با حروف لاتین شروع شود کاراکتر های مجاز(اعداد، . _)",
};

//Validation
const registerValidator = () => [
  body("username")
    .notEmpty()
    .withMessage("نام کاربری وارد نشده است")
    .bail()
    .isLength({ min: 4, max: 25 })
    .withMessage("نام کاربری باید بین 4 تا 25 کاراکتر باشد")
    .bail()
    .matches(USERNAME_REGEXP.match)
    .withMessage(USERNAME_REGEXP.msg)
    .bail()
    .custom(async (input) => {
      const user = await userModel.findOne({ username: input });
      if (user) throw "نام کاربری در سیستم موجود میباشد.";
      return true;
    }),

  body("email")
    .notEmpty()
    .withMessage("ایمیل وارد نشده است")
    .bail()
    .isEmail()
    .withMessage("ایمیل وارد شده صحیح نمیباشد")
    .bail()
    .custom(async (input) => {
      const user = await userModel.findOne({ email: input });
      if (user) throw "ایمیل در سیستم موجود میباشد.";
      return true;
    }),
  body("mobile")
    .notEmpty()
    .withMessage("شماره موبایل وارد نشده است")
    .bail()
    .isMobilePhone("fa-IR")
    .withMessage("شماره موبایل وارد شده صحیح نمیباشد")
    .bail()
    .custom(async (input) => {
      const user = await userModel.findOne({ mobile: input });
      if (user) throw "شماره همراه در سیستم موجود میباشد.";
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("رمز عبور وارد نشده است")
    .bail()
    .isLength({ max: 16, min: 6 })
    .withMessage("رمز عبور حداقل 6 و حداکثر 16 کاراکتر باید باشد. ")
    .bail()
    .custom((value, ctx) => {
      if (value !== ctx.req?.body?.confirm_password)
        throw "رمز عبور با تکرار آن برابر نیست";
      return true;
    }),
];

const loginValidator = () => [
  body("username")
    .notEmpty()
    .withMessage("نام کاربری نمیتواند خالی باشد")
    .bail()
    .matches(USERNAME_REGEXP.match)
    .withMessage(USERNAME_REGEXP.msg),
  body("password")
    .isLength({ max: 16, min: 6 })
    .withMessage("رمز عبور حداقل 6 و حداکثر 16 کاراکتر باید باشد. "),
];
module.exports = { registerValidator, loginValidator };
