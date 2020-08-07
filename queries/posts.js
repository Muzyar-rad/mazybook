const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const { pool } = require("../startup/db");
const auth = require("../middleware/auth");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    (file.mimetype =
      "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/gif")
  )
    cb(null, true);
  else {
    cb(new Error("Wrong file format"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

router.get("/", async (req, res) => {
  const { rows } = await pool.query(
    'SELECT "Post".postid,"Post".text,"Post"."postImage","Post"."createdAt","User".userid,"User".name FROM "Post" LEFT JOIN "User" ON "Post".userid = "User".userid ORDER BY postid DESC;'
  );
  res.status(200).send(rows);
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM "Post" WHERE postid = $1', [
    id
  ]);
  res.status(200).send(rows[0]);
});

router.post("/", upload.single("postImage"), async (req, res) => {
  const { text, userid } = req.body;
  let postImage = null;
  if (req.file && req.file.path != undefined) postImage = req.file.path;

  if (text && text.length > 130)
    return res.status(400).send("Too many characters for text input");
  try {
    const { rows } = await pool.query(
      'INSERT INTO "Post" (text,"postImage",userid) VALUES ($1,$2,$3) returning *',
      [text, postImage, userid]
    );
    res.status(200).send(rows[0]);
  } catch (ex) {
    console.log(ex);
  }
});

router.delete("/:id", [auth], async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query(
    'SELECT "postImage",userid FROM "Post" WHERE postid=$1',
    [id]
  );
  if (req.user.userid !== rows[0].userid)
    return res
      .status(403)
      .send("This User is not allowed to delete another Users' Post");
  if (rows[0].postImage != null) {
    fs.unlink(rows[0].postImage, err => {
      if (err)
        res.status(400).send("Something went wrong while deleting image");
    });
  }
  await pool.query('DELETE FROM "Post" WHERE postid=$1', [id]);
  res.status(200).send("Post has been deleted");
});

// router.patch("/:id", async (req, res) => {
//   const { id } = req.params;
//   const { text } = req.body;
//   await pool.query('UPDATE "Post" SET text=$1 WHERE postid=$2', [text, id]);
//   res.status(200).send("The post's text has been updated");
// });

// router.patch("/image/:id", async (req, res) => {
//   const { id } = req.params;
//   const { postImage } = req.body;
//   await pool.query('UPDATE "Post" SET "postImage"=$1 WHERE postid=$2', [
//     postImage,
//     id
//   ]);
//   res.status(200).send("The post's image has been updated");
// });

module.exports = router;
