const router = require("express").Router();
// Import all routes
const authRouter = require("./auth");
const projectRouter = require("./project");
const userRouter = require("./user");
const teamRouter = require("./team");

// Config routes
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/project", projectRouter);
router.use("/team", teamRouter);

module.exports = router;
