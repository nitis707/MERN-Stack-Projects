const express = require("express");
const router = express.Router(); // router object
const { register, login } = require("../controllers/usersController")

// rooutes

// Register
router.route("/register").post(register);
router.route("/login").post(login);



module.exports = router;