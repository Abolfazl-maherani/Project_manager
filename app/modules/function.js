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
    if (typeof payload === "object") {
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
const validateTokne = (
  token,
  forLogin = false,
  secret = process.env.SIGN_JWT
) => {
  try {
    if (!token) return;
    const matchToken = /(Bearer).{5,}/;
    if (token.match(matchToken)) {
      token = token.substr(6).trim();
      return jwt.verify(token, secret);
    }
  } catch (error) {
    if (!forLogin)
      throw {
        message: "مجوز دسترسی ندارید لطفا لاگین کنید.",
        status: 403,
        success: false,
      };
  }
};
const checkField = (inputField, ...accessField) => {
  if (!accessField && !inputField) return;
  if (typeof inputField === "object") input = Object.entries(inputField);
  if (!Array.isArray(inputField)) return;
  inputField.forEach((elem) => {
    if (!accessField.includes(elem)) {
      return false;
    }
  });
  return true;
};
module.exports = {
  hashString,
  equalStringToHash,
  generateToken,
  validateTokne,
  checkField,
};
