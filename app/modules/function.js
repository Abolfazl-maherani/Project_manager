const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hashString = (str) => {
  if (!str) return;
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
};
const equalStringToHash = (str, hashPassword) => {
  return bcrypt.compareSync(str, hashPassword);
};
const generateToken = (payload) => {
  try {
    if (!payload) return;
    if (payload.toString() === "[object Object]") {
      const { username } = payload;
      payload = {
        username,
      };
    }
    return jwt.sign(payload, process.env?.SIGN_JWT, {
      expiresIn: "1 years",
      algorithm: "HS256",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  hashString,
  equalStringToHash,
  generateToken,
};
