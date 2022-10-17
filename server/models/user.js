const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
  })
);
const user = new User({
  firstName: "John",
  lastName: "Doe",
  email: "JohnDoe@gmail.com",
});

const result = await user.save();

exports.User = User;
