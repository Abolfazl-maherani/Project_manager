const { isValidObjectId } = require("mongoose");
const validationObjectId = (input) => {
  if (!isValidObjectId(input)) throw " آی دی وارد شده صحیح نمیباشد";
  return true;
};
module.exports = {
  validationObjectId,
};
