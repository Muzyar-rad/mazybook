const express = require("express");
const config = require("config");
const { db } = require("./startup/db");
const app = express();

db();
require("./startup/cors")(app);
require("./startup/queries")(app);

const port = process.env.port || config.get("port");
app.listen(port, () => console.log(`Listening on port ${port}`));

//changing the backend
