const { validationResult } = require("express-validator");
const checkValidation = (req, res, next) => {
  if (!req.body) return;
  const { errors } = validationResult(req);
  if (errors.length) {
    let message = {};
    errors.forEach((element) => {
      message[element.param] = element.msg;
    });
    throw {
      status: 400,
      success: false,
      message,
    };
  }
  next();
};
module.exports = checkValidation;
