const { body, check, param } = require("express-validator");
const { version } = require("mongoose");
const { userModel } = require("../../models/user");
const { validationObjectId } = require("./public");
//TODO: Can create function for check is exist field replace to key in req.body
const userValidator = () => [
  body("email")
    .if((val, { req }) => "email" in req.body)
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
    .if((val, { req }) => "mobile" in req.body)
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
    .if((val, { req }) => "password" in req.body)
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
  body("first_name")
    .if((val, { req }) => "first_name" in req.body)
    .custom(async (input, { req }) => {
      const { username } = req.user;
      const first_name = await userModel.find({ username }, "first_name");
      //If first_name saved in db and send empty first_name
      if (first_name[0]["first_name"] && !input.trim()) {
        throw {
          message: "نام شما نمیتواند خالی باشد",
        };
      }
      return true;
    }),
  body("last_name")
    .if((val, { req }) => "last_name" in req.body)
    .trim()
    .custom(async (input, { req }) => {
      const { username } = req.user;
      const last_name = await userModel.find({ username }, "last_name");
      if (last_name[0]["last_name"] && !input.trim()) {
        throw {
          message: "نام خانوادگی شما نمیتواند خالی باشد",
        };
      }
      return true;
    }),
];
const acceptInvite = () => [
  param("id")
    .notEmpty()
    .withMessage("شناسه کاربر نمیتواند خالی باشد")
    .bail()
    .trim()
    .custom(validationObjectId)
    .bail()
    .custom((input, { req }) => {
      const commonMessage = "شناسه وارد شده با درخواست های شما مطابقت ندارد";
      const { invites: userInvites } = req.user;
      if (!userInvites.length) throw commonMessage;
      const userInvitesId = userInvites.map(({ _id }) => _id.toString());
      console.log(userInvitesId);
      if (!userInvitesId.includes(input)) throw commonMessage;
      return true;
    }),
];

module.exports = {
  userValidator,
  acceptInvite,
};
