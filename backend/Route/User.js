const router = require("express").Router();
const user = require("../Controller/User");

// register
router.post("/register", user.Register);

// login
router.post("/login", user.Login);

module.exports = router;
