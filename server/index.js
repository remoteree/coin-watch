const mongoose = require("mongoose");
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const dotenv = require("dotenv").config();

const users = require("./routes/users");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(express.json());
app.use("/api/users", users);

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
