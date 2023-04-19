const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

require("./routes/user")(app, mongoose);
require("./routes/playerInfo")(app, mongoose);
require("./routes/adventure")(app, mongoose);

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

app.listen(5000, () => {
  console.log("server started on port 5000");
});
