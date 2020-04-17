require("dotenv").config();
const mongoose = require('mongoose');
const keys = require("./config/keys");
const express = require("express");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require("path");
const users = require("./routes/api/users");
const authRoutes = require("./routes/auth/auth-routes");
const gamelistRoutes = require('./routes/api/get-games-list');
const platformslistRoutes = require ('./routes/api/get-platforms-list');
const saveGames = require('./routes/api/save-games');
const passport = require("passport");
const app = express();


//connect to database
mongoose.connect(keys.MONGODB_URI,{ useNewUrlParser: true, useCreateIndex: true }, () => {
  console.log("connected to mongo db");
});

var store = new MongoDBStore({
  uri: keys.MONGODB_URI,
  collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('trust proxy', 1);// trust first proxy

app.use(cookieParser());
app.use(session({
  secret: keys.COOKIE_KEY,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: false,
  saveUninitialized: false
}));

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// set up routes
app.use("/auth", authRoutes);
app.use('/api/get-games-list', gamelistRoutes);
app.use('/api/get-platforms-list', platformslistRoutes);
app.use('/api/save-games', saveGames);
app.use("/api/users", users);

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));