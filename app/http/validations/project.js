const { body, param } = require("express-validator");
const { validationObjectId } = require("./public");
const createProjectValidator = () => [
  body("title")
    .notEmpty()
    .withMessage("عنوان پروژه نمیتواند خالی باشد")
    .bail()
    .isLength({ min: 5 })
    .withMessage("حداقل طول عنوان باید 5 کاراکتر باشد"),
  body("team")
    .if((val, { req }) => "team" in req.body)
    .isArray()
    .withMessage("ورودی تیم باید به صورت آرایه باشد")
    .bail()
    .custom((input, { req }) => {
      const commonErrorMessage = { message: "تیم انتخابی معتبر نیست" };
      const { team: teamId } = req.user;
      if (!teamId.length) throw commonErrorMessage;
      const StringsId = teamId.map((objId) => objId.toString());
      input.forEach((el) => {
        if (!StringsId.includes(el)) throw commonErrorMessage;
      });
      return true;
    }),
  body("private")
    .if((val, { req }) => "private" in req.body)
    .isBoolean()
    .withMessage("ورودی فیلد پرایویت درست نمیباشد")
    .toBoolean(),
  body("tags")
    .if((val, { req }) => "tags" in req.body)
    .isArray()
    .withMessage("ورودی تگ ها باید به صورت آرایه باشد"),
];
const getByIdProjectValidator = () => [param("id").custom(validationObjectId)];
module.exports = { createProjectValidator, getByIdProjectValidator };
