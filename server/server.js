const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());

const mongoUrl =
  "mongodb+srv://admin:OqCfT4snSKtMY45S@cluster0.nrlwnj8.mongodb.net/ProjetWeb";

const JWT_SECRET = "efkffjzehfjhzeufhzufhziofhziofhuerhfuzofuhzf";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => console.log(e));

require("./user");
const User = mongoose.model("Users");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    await User.create({
      fname,
      lname,
      email,
      password,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.status(500).send({ status: error });
  }
});

app.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

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

app.listen(5000, () => {
  console.log("server started on port 5000");
});
