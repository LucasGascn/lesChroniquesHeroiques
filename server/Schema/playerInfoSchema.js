const mongoose = require("mongoose");
const playerInfoSchema = mongoose.Schema(
  {
    user: mongoose.Schema.Types.ObjectId,
    name: String,
    adventure: mongoose.Schema.Types.ObjectId,
    stats: [],
    inventory: [],
    currency: Number,
  },
  {
    collection: "Characters",
  }
);
module.exports = playerInfoSchema;
