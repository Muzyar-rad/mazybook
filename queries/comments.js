const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { pool } = require("../startup/db");

router.get("/", async (req, res) => {
  const { rows } = await pool.query(
    'SELECT "Comment".*, "User".name FROM "Comment" INNER JOIN "User" ON "Comment".userid = "User".userid '
  );
  res.status(200).send(rows);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    'SELECT * FROM "Comment" WHERE commentid = $1',
    [id]
  );
  res.status(200).send(rows[0]);
});

router.post("/", async (req, res) => {
  const { userid, postid, textComment } = req.body;
  if (textComment && textComment.length > 24)
    return res
      .sendStatus(403)
      .send("Exceeding the number of characters allowed for comment");
  const { rows } = await pool.query(
    'INSERT INTO "Comment" (userid,postid,"textComment") VALUES ($1,$2,$3) RETURNING postid',
    [userid, postid, textComment]
  );
  res.status(200).send(rows[0]);
});

router.delete("/:id", [auth], async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    'SELECT userid FROM "Comment" WHERE commentid=$1',
    [id]
  );
  if (req.user.userid !== rows[0].userid)
    return res
      .status(403)
      .send("This user is not authorized to delete another user's comment");
  await pool.query('DELETE FROM "Comment" WHERE commentid=$1', [id]);
  res.status(200).send("Comment has been successfully deleted");
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { textComment } = req.body;
  await pool.query('UPDATE "Comment" SET textComment=$1 WHERE commentid=$2', [
    textComment,
    id
  ]);
  res.status(200).send("Comment has been updated");
});

module.exports = router;
