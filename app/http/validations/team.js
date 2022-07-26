const { isValidObjectId } = require("mongoose");
const { body, param } = require("express-validator");
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
    .custom((input, { req }) => {
      input.forEach((element) => {
        if (!isValidObjectId(element)) throw "کاربری یافت نشد";
        return true;
      });
    }),
];
module.exports = { createTeamValidator };
