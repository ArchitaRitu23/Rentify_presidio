const router = require("express").Router();
const seller = require("../Controller/Seller");

// register
router.post("/register", seller.Register);

// login
router.post("/login", seller.Login);

module.exports = router;
