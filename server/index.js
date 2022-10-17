const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const dotenv = require("dotenv").config();

console.log(dotenv.parsed);
require("./database");

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
