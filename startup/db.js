const { Client, Pool } = require("pg");
const config = require("config");

const connectionString = config.get("db");

const client = new Client({ connectionString });
const pool = new Pool({ connectionString });

exports.pool = pool;
exports.db = function() {
  client
    .connect()
    .then(() => console.log("Connected to PostgreSQL database ..."));
};
