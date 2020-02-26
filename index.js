require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const path = require("path");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();

passport.serializeUser((user, done) => {
  done(null, user._json);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:5555/auth/steam/return",
      realm: "http://localhost:5555",
      apiKey: process.env.KEY
    },
    (identifier, profile, done) => {
      return done(null, profile);
    }
  )
);

app.use(
  session({
    secret: process.env.SECRET,
    name: "U_SESSION",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    console.log('hi');
})

app.get(
  /^\/auth\/steam(\/return)?$/,
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => {
    console.log("REDIRECTED")
    res.redirect("/");
  }
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.post("/", function(req, res) {
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

// Routes
//app.use('/api/dashboard', require('./routes/api/dashboard') );

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
