const router = require("express").Router();

router.use("/auth");
router.use("/user");
router.use("/project");
router.use("/team");

module.exports = router;
