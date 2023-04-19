const mongoose = require("mongoose");
const adventureSchema = mongoose.Schema(
  {
    players: [mongoose.Schema.Types.ObjectId],
    name: String,
    gameMaster: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    description: String,
    size: Number,
    quests: [],
    pnj: [],
    classes: [],
  },
  {
    collection: "Adventure",
  }
);
module.exports = adventureSchema;