require("../index.js");
const passport = require("passport");
const SteamStrategy = require("passport-steam");
const keys = require("./keys");
const User = require("../models/user-model");

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

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:5555/auth/steam/return",
      realm: "http://localhost:5555/",
      apiKey: keys.STEAM_KEY
    },
    async (identifier, profile, done) => {
      const currentUser = await User.findOne({ steamId: profile.id });

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
