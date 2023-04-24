const mongoose = require("mongoose");
const playerInfoSchema = mongoose.Schema(
  {
    user: mongoose.Schema.Types.ObjectId,
    name: String,
    aventure: mongoose.Schema.Types.ObjectId,
    stats: [],
    inventory: [],
    currency: Number,
  },
  {
    collection: "Characters",
  }
);
module.exports = playerInfoSchema;
