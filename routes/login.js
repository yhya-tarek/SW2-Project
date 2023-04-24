const router = require("express").Router();
const CONNECTION = require("../db/connection");
const conn = new CONNECTION();
const connection = conn.Connection();
const LOGIN = require("../controllers/loginController");
const login = new LOGIN();

router.post("/", login.loginAuth());

module.exports = router;
