require("dotenv").config();
const mongoose = require('mongoose');
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const express = require("express");
const cors = require("cors");
const users = require("./routes/api/users");
const authRoutes = require("./routes/auth/auth-routes");
const gamelistRoutes = require('./routes/api/get-games-list');
const platformslistRoutes = require ('./routes/api/get-platforms-list');
const passport = require("passport");
const app = express();
<<<<<<< HEAD
app.use(cookieParser(keys.COOKIE_KEY));
app.use(session({
  secret: keys.COOKIE_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
=======
const cookieParser = require("cookie-parser"); // parse cookie header


>>>>>>> parent of c0b5a0e... Session works! Now just need to implement it correctly.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to database
mongoose.connect(keys.MONGODB_URI,{ useNewUrlParser: true, useCreateIndex: true }, () => {
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

app.use(cors({
  origin: "http://localhost:5556", // allow to server to accept request from different origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true // allow session cookie from browser to pass through
}));

// initalize passport
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// deserialize cookie from the browser
app.use(passport.session());

// set up routes
app.use("/auth", authRoutes);
app.use('/api/get-games-list', gamelistRoutes);
app.use('/api/get-platforms-list', platformslistRoutes);
app.use("/api/users", users);

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
