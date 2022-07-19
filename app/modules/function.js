const bcrypt = require("bcrypt");
const hashString = (str) => {
  if (!str) return;
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
};

module.exports = {
  hashString,
};
