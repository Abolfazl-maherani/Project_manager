const checkLogged = require("../http/middlewares/checkLogged");
const router = require("express").Router();
router.get("/profile", checkLogged, (req, res, next) => {
  res.json(req.user);
});
module.exports = router;
