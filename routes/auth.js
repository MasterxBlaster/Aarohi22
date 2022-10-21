const { register, googleAuth } = require("../controllers/register");

const router = require("express").Router();

router.route("/").post(register);
router.route("/googleAuth").get(googleAuth);

module.exports = router;
