const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const schema = Joi.object({
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(255).required(),
});

router.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  // Bcrypt.compare() compares the password to the hashed password using the salt. If equal, return true.
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  //This creates a webtoken which uses the userID as a form of identification

  res.send(token);
});

module.exports = router;
