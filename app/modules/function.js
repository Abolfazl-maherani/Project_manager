const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _URL = require("url");
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
  let result = true;
  inputField.forEach((elem) => {
    if (!accessField.includes(elem)) {
      result = false;
    }
  });
  return result;
};
const deleteAddationalField = (input, ...accessField) => {
  const inputField = Object.keys(input);
  if (!checkField(inputField, ...accessField)) {
    inputField.forEach((element) => {
      if (!accessField.includes(element)) {
        delete input[element];
      }
    });
    return input;
  }
};
const pathToFileUrl = (path) => {
  if (!typeof path === "string") return;
  const { href: url } = _URL.pathToFileURL(path);
  const statcFolder = "public";
  return url.substring(url.indexOf(statcFolder) + statcFolder.length);
};
const baseUrl = (req, port = process.env.PORT) => {
  if (!req) return;
  var regexpUrl =
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  port = !isNaN(port) ? Number(port) : null;
  const url = `${req.protocol}://${req.hostname}${port ? ":" + port : ""}`;
  return url.match(regexpUrl) ? url : null;
};
const fullStaticUrl = (baseUrl, relativeUrl) => {
  if (typeof baseUrl !== "string" && typeof relativeUrl !== "string") return;
  return new URL(relativeUrl.trim(), baseUrl.trim()).href;
};
const getUploadUrlToDb = (req) => {
  if (!req) return;
  if (!"file" in req || !"files" in req) return;
  const { file, files } = req;
  const uploadPath = file ? file : files;
  return pathToFileUrl(uploadPath.path);
};
module.exports = {
  hashString,
  equalStringToHash,
  generateToken,
  validateTokne,
  checkField,
  deleteAddationalField,
  pathToFileUrl,
  baseUrl,
  fullStaticUrl,
  getUploadUrlToDb,
};
