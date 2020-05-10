const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.hashedPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.isValidEmail = async function(email) {
  return await /\S+@\S+\.\S+/.test(email);
};

exports.generateToken = function(id, name, email) {
  const token = jwt.sign(
    {
      userid: id,
      name: name,
      email: email
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

exports.validPassword = async function(bodyPassword, userPassword) {
  return await bcrypt.compare(bodyPassword, userPassword);
};
