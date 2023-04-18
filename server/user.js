const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: String,
    password: String,
  },
  {
    collection: "Users",
  }
);

mongoose.model("Users", userSchema);
