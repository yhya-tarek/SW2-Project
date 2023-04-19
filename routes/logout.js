const router = require("express").Router();
const LOGOUT = require("../controllers/logoutController");
const logout = new LOGOUT();

router.post("/", logout.logOut());

module.exports = router;
