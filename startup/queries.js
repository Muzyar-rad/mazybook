const express = require("express");
const posts = require("../queries/posts");
const comments = require("../queries/comments");
const users = require("../queries/users");
const auth = require("../queries/auth");

module.exports = function(app) {
  app.use(express.json());
  app.use("/uploads", express.static("uploads"));
  app.use("/api/posts", posts);
  app.use("/api/comments", comments);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};
