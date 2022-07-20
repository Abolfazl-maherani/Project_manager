const env = require("dotenv").config();
const Application = require("./app/server");
const port = process.env?.PORT || 8000;
const app = new Application(port, "mongodb://localhost:27017/projectManageDB");
