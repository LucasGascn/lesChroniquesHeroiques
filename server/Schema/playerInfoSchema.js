const mongoose = require("mongoose");
const playerInfoSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, res:"Users" },
    adventureId: { type: mongoose.Schema.Types.ObjectId, ref: "Adventure" },
    name: String,
    job: String,
    stats: [],
    inventory: [],
    currency: Number,
  },
  {
    collection: "Characters",
  }
);
module.exports = playerInfoSchema;
