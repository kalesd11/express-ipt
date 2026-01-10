const express = require('express');
const router = express.Router();
const db = require("../config/db");


/* GET users listing. */
router.get('/', async function(req, res, next) {
  const [rows] = await db.query("SELECT * FROM users");
  res.send(rows);
});

module.exports = router;
