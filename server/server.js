const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const socketIO = require("socket.io");
const http = require("http");
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

require("./routes/user")(app, mongoose);
require("./routes/playerInfo")(app, mongoose);
require("./routes/adventure")(app, mongoose);
require("./websockets/adventureWebsocket")(mongoose, io);

const mongoUrl =
  "mongodb+srv://admin:OqCfT4snSKtMY45S@cluster0.nrlwnj8.mongodb.net/ProjetWeb";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => console.log(e));

server.listen(5000, () => {
  console.log("server listen on 5000");
});
