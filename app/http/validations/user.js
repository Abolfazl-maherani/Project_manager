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
];

module.exports = userValidator;
