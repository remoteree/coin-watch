const _ = require("lodash");
const { User, userSchema } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  await user.save();

  res.send(_.pick(user, ["_id", "name", "email"]));
  //   We use the .pick method from lodash here to get an elegant way of writing the below code
  //   name: req.body.name,
  //   email: req.body.email,
});

module.exports = router;
