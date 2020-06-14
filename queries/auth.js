const express = require("express");
const signIn = require("../middleware/signup");
const { pool } = require("../startup/db");
const router = express.Router();

router.post("/", async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send("One or more fields are empty");
  if (!signIn.isValidEmail(req.body.email))
    return res.status(400).send("Enter a valid email address");
  const { rows } = await pool.query(
    'SELECT userid,name,email,password FROM "User" WHERE email=$1',
    [req.body.email]
  );
  if (rows.length == 0)
    return res.status(400).send("Invalid email or password");
  const user = rows[0];
  const validPassword = await signIn.validPassword(
    req.body.password,
    user.password
  );
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = signIn.generateToken(user.userid, user.name, user.email);
  res.send(token);
});

module.exports = router;

//Refactor