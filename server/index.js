require("express-async-errors"); //Helps wrap routes to async error handling middleware
const winston = require("winston"); //Helps with logging errors using Transport
require("winston-mongodb");
const error = require("./middleware/error");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();

winston.handleExceptions(
  new winston.transports.File({ filename: "uncaughtExceptions.log" }) //Deals with handling exceptions and rejections
);

process.on("unhandledRejection", (ex) => {
  throw ex;
});

winston.add(winston.transports.File, { filename: "logfile.log" }); //Adds error logs to this logfile
winston.add(winston.transports.MongoDB, { db: process.env.MONGODB_URI }); //Adds error logs to mongoDB, normally we don't store this in database

//---

if (!process.env.jwtPrivateKey) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1); //Might need to revisit this later in case issues with environment jwt variable
}

const users = require("./routes/users");
const auth = require("./routes/auth");
console.log(dotenv.parsed);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
