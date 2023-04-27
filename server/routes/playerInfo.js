module.exports = (app, mongoose) => {
  const CharacterSchema = require("../Schema/playerInfoSchema");
  const Character = mongoose.model("Characters", CharacterSchema);

  app.post("/addplayer", async (req, res) => {
    const character = req.body;
    console.log(character)
    try {
      await Character.create(character);
      res.send({ status: "ok", character: character });
    } catch (error) {
      console.log(error)
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

    const characters = await Character.find({ adventureId: adventureId });
    if (characters) {
      return res.send({ data: characters });
    }
    else{
      return res.send({ status_message: "Aucun héro n'est affilié à cette aventure"});
    }
  });
};
