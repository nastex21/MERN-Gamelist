require("dotenv").config();
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const path = require("path");
const axios = require("axios");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const authRoutes = require("./routes/auth/auth-routes");
const app = express();
const cookieParser = require("cookie-parser"); // parse cookie header

// connect to mongodb
mongoose.connect(keys.MONGODB_URI, () => {
  console.log("connected to mongo db");
});

app.use(
  cookieSession({
    name: "session",
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100
  })
);

// parse cookies
app.use(cookieParser());

/* // initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session()); */


app.use(cors({
  origin: "http://localhost:5556", // allow to server to accept request from different origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true // allow session cookie from browser to pass through
}));

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// set up routes
app.use("/auth", authRoutes);

require('./config/passport-setup')(app);

/* const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
}; */

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
/* app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
}); */

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
