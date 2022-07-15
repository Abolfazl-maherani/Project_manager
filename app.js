const Application = require("./app/server");
const app = new Application(8000, "mongodb://localhost:27017/projectManageDB");
