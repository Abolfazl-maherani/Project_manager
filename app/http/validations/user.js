const { body } = require("express-validator");
const { version } = require("mongoose");
const { userModel } = require("../../models/user");

const userValidator = () => [
  body("email")
    .if((val, { req }) => !!req.body["email"])
    .trim()
    .normalizeEmail({ all_lowercase: true })
    .isEmail()
    .withMessage("ایمیل وارد شده صحیح نمیباشد")
    .bail()
    .custom(async (input) => {
      const user = await userModel.findOne({ email: input });
      if (user) throw "ایمیل در سیستم موجود میباشد.";
      return true;
    }),
  body("mobile")
    .if((val, { req }) => !!req.body["mobile"])
    .trim()
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
    .if((val, { req }) => !!req.body["password"])
    .notEmpty()
    .withMessage("رمز عبور وارد نشده است")
    .bail()
    .isLength({ max: 16, min: 6 })
    .withMessage("رمز عبور حداقل 6 و حداکثر 16 کاراکتر باید باشد. "),
];

module.exports = userValidator;
