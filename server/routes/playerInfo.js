module.exports = (app, mongoose) => {
  const CharacterSchema = require("../Schema/playerInfoSchema");
  const Character = mongoose.model("Characters", CharacterSchema);

  app.post("/addplayer", async (req, res) => {
    const { name, aventure, userReq } = req.body;
    try {
      await Character.create({
        user: userReq.user._id,
        name,
        aventure,
      });
      res.send({ status: "ok" });
    } catch (error) {
      res.status(500).send({ status: error });
    }
  });

  app.post("/getplayer", async (req, res) => {
    const { email, password } = req.body;

    const user = await Character.findOne({ email });

    if (!user) {
      return res.send({ status: "error", error: "user not found" });
    }

    if (user.password === password) {
      const token = jwt.sign({ user }, JWT_SECRET);

      if (res.status(201)) {
        return res.send({ token: token, status: "ok" });
      } else {
        return res.send({ error: "error" });
      }
    }
    res.send({ status: "error", error: "Mauvais mot de passe" });
  });

  app.get("/getPlayerByAdventure/:id", async (req, res) => {
    const adventureId = req.params.id;

    const characters = await Character.find({ adventure: adventureId });
    if (characters) {
      return res.send({ data: characters });
    }
  });
};
