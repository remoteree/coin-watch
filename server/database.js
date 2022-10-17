const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

async function createUser() {
  const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
  });

  const User = mongoose.model("User", userSchema);
  const user = new User({
    firstName: "John",
    lastName: "Doe",
    email: "JohnDoe@gmail.com",
  });

  const result = await user.save();
  console.log(result);
}

createUser();
