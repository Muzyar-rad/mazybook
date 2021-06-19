const express = require("express");
const config = require("config");
const app = express();

require("./startup/db").db();
require("./startup/cors")(app);
require("./startup/queries")(app);

const port = process.env.port || config.get("port");
app.listen(port, () => console.log(`Listening on port ${port}`));
