const express = require("express");
const router = express.Router();
const userService = require("../services/user.service");
const auth = require("../middleware/auth.middleware");


/* GET users listing. */
router.get("/", auth, userService.getAllUsers);

// POST /users – Create user.
router.post("/", userService.createUser);

module.exports = router;
