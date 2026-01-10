const router = require("express").Router();
const authController = require("../services/auth.service");


//POST /auth/login – JWT-based authentication.
router.post("/login", authController.login);

module.exports = router;
