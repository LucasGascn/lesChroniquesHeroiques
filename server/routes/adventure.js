module.exports = (app, mongoose) => {
  const adventureSchema = require("../Schema/adventureSchema");
  const Adventure = mongoose.model("Aventure", adventureSchema);
  const userSchema = require("../Schema/userSchema");
  const User = mongoose.model("Users", userSchema);
  const watcher = Adventure.watch();
  watcher.on("change", (change) => {});
  app.post("/addAdventure", async (req, res) => {
    const {
      name,
      description,
      gameMaster,
      size,
      players,
      quests,
      pnj,
      classes,
    } = req.body;
    try {
      await Adventure.create({
        name,
        description,
        gameMaster,
        size,
        players,
        quests,
        pnj,
        classes,
      });
      res.send({ status: "ok" });
    } catch (error) {
      res.status(500).send({ status: error });
    }
  });
  app.get("/getAdventures", async (req, res) => {
    const adventures = await Adventure.find();

    if (!adventures) {
      return res.send({ status: "error", error: "no aven" });
    }
    res.send(adventures);
  });

  app.get("/getAdventure/:id", async (req, res) => {
    const adventureId = req.params.id;
    const adventure = await Adventure.findById(adventureId);
    Adventure.populate(adventure, { path: "Users" });
    if (!adventure) {
      return res.send({ status: "error", error: "aventure not found" });
    }

    res.send(adventure);
  });

  app.post("/updateAdventure/:id", async (req, res) => {
    const adventureId = req.params.id;
    const adventure = req.body.adventure;
    Adventure.findByIdAndUpdate(adventureId, adventure, {
      returnDocument: "after",
    })
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
        res.send({ error });
      });
  });
};
