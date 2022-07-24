const { body } = require("express-validator");

const projectValidator = () => [
  body("title")
    .notEmpty()
    .withMessage("عنوان پروژه نمیتواند خالی باشد")
    .bail()
    .isLength({ min: 5 })
    .withMessage("حداقل طول عنوان باید 5 کاراکتر باشد"),
];
module.exports = projectValidator;
