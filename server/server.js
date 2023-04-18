const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.json());

const mongoUrl =
  "mongodb+srv://admin:OqCfT4snSKtMY45S@cluster0.nrlwnj8.mongodb.net/?retryWrites=true&w=majority";

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
    res.send({ status: "error" });
  }
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
