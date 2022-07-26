const router = require("express").Router();
// Import all routes
const authRouter = require("./auth");
const projectRouter = require("./project");
const userRouter = require("./user");
const teamRouter = require("./team");
const checkLogged = require("../http/middlewares/checkLogged");

// Config routes
router.use("/auth", authRouter);
router.use("/user", checkLogged, userRouter);
router.use("/project", checkLogged, projectRouter);
router.use("/team", checkLogged, teamRouter);

module.exports = router;
