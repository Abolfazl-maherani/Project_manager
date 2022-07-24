const { body } = require("express-validator");

const projectValidator = () => [
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
      const { team } = req.user;
      input.forEach((el) => {
        if (!team.includes(el)) {
          throw { message: "تیم انتخابی درست نمیباشد" };
        }
      });
    }),
];
module.exports = projectValidator;
