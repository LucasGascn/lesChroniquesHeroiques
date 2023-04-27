module.exports = (app, mongoose) => {
  const adventureSchema = require("../Schema/adventureSchema");
  const Adventure = mongoose.model("Aventure", adventureSchema);
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

    if (!adventure) {
      return res.send({ status: "error", error: "aventure not found" });
    }

    res.send(adventure);
    console.log(adventure);
  });

  app.post("/updateAdventure/:id", async (req, res) => {
    console.log(req.body);
    const adventureId = req.params.id;
    const adventure = req.body.adventure;
  
    const adv = await Adventure.findById(adventureId)

    console.log(adv)

    Adventure.findByIdAndUpdate(adventureId, adventure, {
      returnDocument: "after",
    })
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        console.log(error);
        res.send({ error });
      });
  });

  app.get("/getPnjs/:id", async (req, res) => {
    
    const adventureId = req.params.id;
    const adventure = await Adventure.findById(adventureId);
    res.send(adventure.pnj);
  });
  app.get("/getQuests/:id", async (req, res) => {
    const adventureId = req.params.id;
    const adventure = await Adventure.findById(adventureId);
    res.send(adventure.quests);
  });

};
