const express = require("express");
const auth = require("../middleware/auth");
const _ = require("lodash");
const signUp = require("../middleware/signup");
const { pool } = require("../startup/db");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const { rows } = await pool.query(
    'SELECT userid,name,email,createdat FROM "User" WHERE userid=$1',
    [req.user.userid]
  );
  res.send(rows[0]);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM "User" WHERE userid=$1', [id]);
  res.status(200).send(`User with id:${id} has been deleted.`);
});

router.post("/", async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).send("Some values are missing");
  }

  const valid = await signUp.isValidEmail(req.body.email);
  if (!valid) return res.status(200).send("Enter a valid email address");

  let { rows } = await pool.query(
    'SELECT "email" FROM "User" WHERE "email" = $1',
    [req.body.email]
  );

  if (rows.length != 0) return res.status(400).send("User already registered");

  const hashedPassword = await signUp.hashedPassword(req.body.password);
  let users = await pool.query(
    'INSERT INTO "User" (name,email,password) VALUES ($1,$2,$3) Returning *',
    [req.body.name, req.body.email, hashedPassword]
  );

  users = users.rows;
  user = users[0];

  const token = signUp.generateToken(user.userid, user.name, user.email);

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(user);
});

module.exports = router;
//practicing more node.js