require("../index.js");
const passport = require("passport");
const SteamStrategy = require("passport-steam");
const OAuth2Strategy = require("passport-oauth2");
const CustomStrategy = require("passport-custom");
const keys = require("./keys");
const User = require("../models/user-model");
const mongoose = require("mongoose");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize a user"));
    });
});

//Steam Strategy
passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:5555/auth/steam/return",
      realm: "http://localhost:5555/",
      apiKey: keys.STEAM_KEY
    },
    async (identifier, profile, done) => {
      const currentUser = await User.findOne({ steamId: profile.id });
      console.log(mongoose.connection.readyState);

      if (!currentUser) {
        const newUser = await new User({
          steamId: profile._json.steamid,
          name: profile._json.personaname,
          avatar: profile._json.avatar
        }).save();
        if (newUser) {
          done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  )
);

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: "https://auth.gog.com/auth",
      tokenURL: "https://auth.gog.com/token",
      clientID: keys.GOG_ID,
      clientSecret: keys.GOG_SECERT,
      callbackURL: "https://embed.gog.com/on_login_success?origin=client"
    },
    function(accessToken, refreshToken, profile, cb) {
      /*   console.log(accessToken);
  console.log(refreshToken);
  console.log(profile);
  console.log(cb);
  User.findOrCreate({ exampleId: profile.id }, function (err, user) {
    return cb(err, user);
  }); */
      console.log(profile);
    }
  )
);
