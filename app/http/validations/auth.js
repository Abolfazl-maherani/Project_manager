//TODO : Research for can optimization unique check
const { body } = require("express-validator");
const { userModel } = require("../../models/user");

const registerValidator = () => [
  body("username")
    .notEmpty()
    .withMessage("نام کاربری نباید خالی باشد")
    .isLength({ min: 4, max: 25 })
    .withMessage("نام کاربری باید بین 4 تا 25 کاراکتر باشد")
    .matches(/^[a-zA-Z][a-zA-Z1-9\.\_]*$/)
    .withMessage("نام کاربری باید با حروف لاتین شروع شود")
    .custom(async (input) => {
      const user = await userModel.findOne({ username: input });
      if (user) throw "نام کاربری در سیستم موجود میباشد.";
      return true;
    }),

  body("email")
    .notEmpty()
    .withMessage("ایمیل نباید خالی باشد")
    .isEmail()
    .withMessage("ایمیل وارد شده صحیح نمیباشد")
    .custom(async (input) => {
      const user = await userModel.findOne({ email: input });
      if (user) throw "ایمیل در سیستم موجود میباشد.";
      return true;
    }),
  body("mobile")
    .isMobilePhone("fa-IR")
    .withMessage("شماره موبایل وارد شده صحیح نمیباشد")
    .custom(async (input) => {
      const user = await userModel.findOne({ mobile: input });
      if (user) throw "شماره همراه در سیستم موجود میباشد.";
      return true;
    }),
  body("password")
    .isLength({ max: 16, min: 6 })
    .withMessage("رمز عبور حداقل 6 و حداکثر 16 کاراکتر باید باشد. ")
    .custom((value, ctx) => {
      if (!value) throw "رمز عبور وارد نشده است";
      if (value !== ctx.req?.body?.confirm_password)
        throw "رمز عبور با تکرار آن برابر نیست";
      return true;
    }),
];
module.exports = registerValidator;
