module.exports = (mongoose, io) => {
  const { ObjectId } = require("mongodb");

  const gameNamespace = io.of("/game");
  const userSchema = require("../Schema/userSchema");
  const User = mongoose.model("Users", userSchema);
  const adventureSchema = require("../Schema/adventureSchema");
  const Adventure = mongoose.model("Adventure", adventureSchema);

  // Lorsqu'un client se connecte, ajoutez-le à la liste des joueurs connectés
  gameNamespace.on("connection", async (socket) => {
    const userId = socket.handshake.query.userId;
    const user = await User.findById(new ObjectId(userId));
    await User.findOneAndUpdate(
      { _id: userId },
      { socketId: socket.id },
      { returnDocument: "after" }
    );
    console.log(`${user.fname} s'est connecté`);

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
    socket.on("joinRoom", async (adventureId, userId) => {
      const room = await Adventure.findOne({ _id: adventureId });
      if (room) {
        await User.findOneAndUpdate({ _id: userId }, { roomId: room._id });
        room.players.push(userId);
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
      if (player && player.roomId) {
        const room = await Adventure.findById(player.roomId);
        if (room) {
          room.players = room.players.filter((id) => id !== player._id);
          await room.save();
          await User.findOneAndUpdate({ _id: player.id }, { roomId: null });
          socket.leave(room.name);
          console.log(`Joueur ${player.name} a quitté la room ${room.name}`);
        }
      }
    });
  });
};
