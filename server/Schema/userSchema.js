const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String },
    password: String,
    socketId: String,
    roomId: String,
  },
  {
    collection: "Users",
  }
);

module.exports = userSchema;
