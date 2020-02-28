require("dotenv").config();
const mongoose = require('mongoose');
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const apiRoutes = require('./routes/api/get-games-list');
const authRoutes = require("./routes/auth/auth-routes");
const app = express();
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const session = require("express-session");

const cookieParser = require("cookie-parser"); // parse cookie header

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
// deserialize cookie from the browser
app.use(passport.session());

// set up routes
app.use("/auth", authRoutes);
app.use('/api',  apiRoutes);


const PORT = process.env.PORT || 5555;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
