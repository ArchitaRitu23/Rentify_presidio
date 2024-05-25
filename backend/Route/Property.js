const router = require("express").Router();
const sellerAuth = require("../Middleware/sellerAuth");
const property = require("../Controller/Property");

// add property
router.post("/", sellerAuth, property.Add);

router.get("/", property.ReadAll);

module.exports = router;
