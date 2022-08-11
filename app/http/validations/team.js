const { isValidObjectId } = require("mongoose");
const { body, param } = require("express-validator");
const { userModel } = require("../../models/user");
const { teamModel } = require("../../models/team");
const { validationObjectId } = require("./public");
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
const getByIdValidator = () => [
  param("id")
    .exists()
    .withMessage("لطفا شناسه تیم را وارد کنید")
    .bail()
    .notEmpty()
    .withMessage("شناسه تیم خالی است")
    .bail()
    .trim()
    .custom(validationObjectId)
    .bail()
    .custom(async (input, { req }) => {
      const msg = "شما دسترسی لازم  به اطلاعات تیم را ندارید";
      const result = await teamModel.findById(input);
      if (result) {
        const { owner } = result;
        const { _id } = req.user;
        if (owner.toString() === _id.toString()) return true;
      }
      const { invites } = req.user;
      if (!invites.length) throw msg;
      const accessToTeam = [];
      invites.forEach((el) => {
        const { teamId } = el;
        accessToTeam.push(teamId.toString());
      });
      if (!accessToTeam.includes(input)) throw msg;
      return true;
    }),
];
const removeByIdValidator = () => [
  param("id")
    .exists()
    .withMessage("لطفا شناسه تیم را وارد کنید")
    .bail()
    .notEmpty()
    .withMessage("شناسه تیم خالی است")
    .bail()
    .trim()
    .custom(validationObjectId)
    .bail()
    .custom(async (input, { req }) => {
      const msg = "شما دسترسی لازم  به اطلاعات تیم را ندارید";
      const result = await teamModel.findById(input);
      if (result) {
        const { owner } = result;
        const { _id } = req.user;
        if (owner.toString() !== _id.toString()) throw msg;
        return true;
      }
    }),
];
module.exports = { createTeamValidator, getByIdValidator, removeByIdValidator };
