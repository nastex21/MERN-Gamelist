require("dotenv").config();
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const authRoutes = require("./routes/auth/auth-routes");
const app = express();
const cookieParser = require("cookie-parser"); // parse cookie header

// connect to mongodb
mongoose.connect(keys.MONGODB_URI,{ useNewUrlParser: true }, () => {
  console.log("connected to mongo db");
});

app.use(cors({
  origin: "http://localhost:5556", // allow to server to accept request from different origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true // allow session cookie from browser to pass through
}));

// set up routes
app.use("/auth", authRoutes);

require('./config/passport-setup')(app);


app.post("/", function (req, res) {
  const userID = req.body.value;
  var httpVar = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.KEY}&steamid=${userID}&include_appinfo=true&format=json`;
  try {
    console.log("try axios working");
    axios
      .get(httpVar)
      .then(data => res.send(data.data.response))
      .catch(err => res.send(err));
  } catch (err) {
    console.error("GG", err);
  }
});

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
