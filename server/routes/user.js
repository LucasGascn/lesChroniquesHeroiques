const jwt = require("jsonwebtoken");

module.exports = (app, mongoose) => {
  const userSchema = require("../Schema/userSchema");
  const User = mongoose.model("Users", userSchema);
  const JWT_SECRET = "efkffjzehfjhzeufhzufhziofhziofhuerhfuzofuhzf";

  app.post("/register", async (req, res) => {
    const { fname, lname, email, password } = req.body;
    try {
      await User.create({
        fname,
        lname,
        email,
        password,
        socketId: "",
        roomId: "",
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
};
