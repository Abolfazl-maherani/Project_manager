const { isValidObjectId } = require("mongoose");
const { body, param } = require("express-validator");
const { userModel } = require("../../models/user");
const createTeamValidator = () => [
  body("name")
    .exists()
    .withMessage("فیلد نام ضروری است")
    .bail()
    .notEmpty()
    .withMessage("نام تیم نباید خالی باشد")
    .bail()
    .isLength({ min: 3 })
    .withMessage("طول نام تیم نمیتواند کمتر از 3 کلمه باشد"),

  body("description").optional(),
  body("users")
    .optional()
    .isArray()
    .withMessage("نوع فیلد یوزر درست نیست")
    .bail()
    .custom(async (input, { req }) => {
      const { _id: inviterID } = req.user;
      input.forEach((element) => {
        if (!isValidObjectId(element)) throw "کاربری برای دعوت یافت نشد";
        if (inviterID.toString() === element.toString())
          throw "شما نمیتوانید خودتان را دعوت به تیم کنید";
      });
      const usersIsUnique =
        input.isLength > 0
          ? input.every((el, index, arr) => arr.includes(el.toString, index))
          : true;
      if (!usersIsUnique)
        throw "نمیتوانید کاربری را همزمان چند مرتبه دعوت کنید";

      const result = await userModel.find({
        _id: { $in: input },
      });
      if (!result) throw "کاربری یافت نشد";

      return true;
    }),
];
module.exports = { createTeamValidator };
