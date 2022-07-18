// TODO: Create middleware for formatting output error in express validator

const { body } = require("express-validator");
const registerValidator = () => [
  body("username")
    .notEmpty()
    .withMessage("نام کاربری نباید خالی باشد")
    .isLength({ min: 4, max: 25 })
    .withMessage("نام کاربری باید بین 4 تا 25 کاراکتر باشد")
    .custom((input, meta) => {
      if (usernameRegix.test(input)) return true;
      throw {
        message: "نام کاربری صحیح نمیباشد",
      };
    }),
  body("email")
    .notEmpty()
    .withMessage("ایمیل نباید خالی باشد")
    .isEmail()
    .withMessage("ایمیل وارد شده صحیح نمیباشد"),
  body("mobile")
    .isMobilePhone("fa-IR")
    .withMessage("شماره موبایل وارد شده صحیح نمیباشد"),
  body("password")
    .isLength({ max: 16, min: 6 })
    .withMessage("رمز عبور حداقل 6 و حداکثر 16 کاراکتر باید باشد. ")
    .custom((value, ctx) => {
      if (!value) throw { message: "رمز عبور وارد نشده است" };
      if (value !== ctx.req?.body?.confirm_message)
        throw { message: "رمز عبور با تکرار آن برابر نیست" };
      return true;
    }),
];
module.exports = registerValidator;
