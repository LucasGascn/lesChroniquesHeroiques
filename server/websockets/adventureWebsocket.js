module.exports = (mongoose, io, app) => {
  const { ObjectId } = require("mongodb");
  const CharacterSchema = require("../Schema/playerInfoSchema");
  const adventureSchema = require("../Schema/adventureSchema");
  const userSchema = require("../Schema/userSchema");

  const gameNamespace = io.of("/game");
  const User = mongoose.model("Users", userSchema);
  const Adventure = mongoose.model("Adventure", adventureSchema);
  const Character = mongoose.model("Characters", CharacterSchema);

  const advWatcher = Adventure.watch();
  advWatcher.on("change", async (change) => {
    if (change.operationType == "update") {
      const adv = await Adventure.findById(change.documentKey._id);
      io.of("/game").to(adv._id).emit("UpdateAdventure", adv);
    }
  });

  const charWatcher = Character.watch();
  charWatcher.on("change", (change) => {
    if (change.operationType == "insert") {
      console.log(change.fullDocument);
      console.log(io.of("/game").adapter.rooms);
      console.log(
        io
          .of("/game")
          .to(change.fullDocument.adventureId.toString())
          .emit("newCharacter", "new character added")
      );
    }
  });

  app.post("/joinAdventure/:id", async (req, res) => {
    const adventureId = req.params.id;
    const playerId = req.body.playerId;
    const adventure = await Adventure.findById(adventureId);
    const user = await User.findById(playerId);
    user.roomId = adventure._id;
    user.save();
    if (user) {
      user.roomId = adventureId;
      const sockets = io.of("/game").sockets;
      const soc = sockets.get(user.socketId);
      if (soc) {
        soc.join(adventureId);
      }

      io.of("/game")
        .to(adventureId)
        .emit("roomJoined", `${user.fname} a join la room`);
    }
    if (!adventure.players.includes(playerId)) {
      adventure.players.push(playerId);

      adventure.save();
      res.send("Bien ajouté");
    } else {
      res.send("déjà dans l'aventure");
    }
  });
  gameNamespace.on("connection", async (socket) => {
    const userId = socket.handshake.query.userId;
    const user = await User.findById(new ObjectId(userId));
    await User.findOneAndUpdate(
      { _id: userId },
      { socketId: socket.id },
      { returnDocument: "after" }
    );
    console.log(`${socket.id} c'est connecté \r`);
    console.log("----------------");

    // Lorsqu'un joueur crée une nouvelle room, créez une nouvelle instance de room et ajoutez-la à la liste des rooms disponibles
    socket.on("createRoom", async (name, description, gameMaster, size) => {
      const newAdventure = await Adventure.create({
        name,
        description,
        gameMaster,
        size,
        players: [],
        quests: [],
        pnj: [],
        classes: [],
      });
      await User.findOneAndUpdate(
        { socketId: socket.id },
        { roomId: newAdventure._id }
      );
      socket.join(name);
      socket.emit("roomCreated", newAdventure);
      console.log(`Room ${name} créée`);
    });

    // Lorsqu'un joueur rejoint une room existante, ajoutez-le à la liste des joueurs de cette room et faites-le rejoindre la room
    socket.on("JoinRoom", async (data) => {
      console.log("test");
      const room = await Adventure.findOne({ _id: data.adventureId });
      if (room) {
        await User.findOneAndUpdate({ _id: data.userId }, { roomId: room._id });
        room.players.push(data.userId);
        await room.save();
        socket.join(room.name);
        console.log(`Joueur ${socket.id} a rejoint la room ${room.name}`);
      } else {
        console.log(`La room ${room.name} n'existe pas`);
      }
    });

    // Lorsqu'un joueur quitte la room, supprimez-le simplement de la liste des joueurs de cette room
    socket.on("leaveRoom", async (userId) => {
      const player = await User.findOne({ _id: userId });
      console.log(player);
      if (player && player.roomId) {
        const room = await Adventure.findById(player.roomId);
        if (room) {
          const index = room.players.indexOf(player._id);
          room.players.splice(index, 1);
          await room.save();
          await User.findOneAndUpdate({ _id: player.id }, { roomId: null });
          socket.leave(room.name);
          console.log(`Joueur ${player.fname} a quitté la room ${room.name}`);
        }
      }
    });

    app.post("/leaveAdventure/:id", async (req, res) => {
      const playerId = req.params.id;
      const player = await User.findOne({ _id: playerId });
      if (player && player.roomId) {
        const room = await Adventure.findById(player.roomId);
        if (room) {
          const index = room.players.indexOf(player._id);
          room.players.splice(index, 1);
          await room.save();
          await User.findOneAndUpdate({ _id: player.id }, { roomId: null });
          socket.leave(room._id.toString());
          // socket.disconnect();
          //console.log(`Joueur ${player.fname} a quitté la room ${room.name}`);
          res.send("ok");
        }
      }
    });
  });
};
