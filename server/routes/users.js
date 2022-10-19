const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, userSchema } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  // bcrypt.genSalt generates a random string called the salt which we add to the user password

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token) // First argument is name of header, value is the second arg
    .send(_.pick(user, ["_id", "name", "email"]));
  //   We use the .pick method from lodash here to get an elegant way of writing the below code
  //   name: req.body.name,
  //   email: req.body.email,
});

module.exports = router;
