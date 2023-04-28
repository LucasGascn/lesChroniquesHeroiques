module.exports = (app, mongoose) => {
  const adventureSchema = require("../Schema/adventureSchema");
  const Adventure = mongoose.model("Aventure", adventureSchema);
  const userSchema = require("../Schema/userSchema");
  const User = mongoose.model("Users", userSchema);
  const watcher = Adventure.watch();
  watcher.on("change", (change) => {});
  app.post("/addAdventure", async (req, res) => {
    const adventure = req.body.adventure;
    console.log(adventure);
    try {
      console.log("test");
      const adv = await Adventure.create(adventure);
      res.send({ status: "ok", adv: adv });
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
    console.log(adventure);
  });

  app.post("/:id", async (req, res) => {
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
