const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
