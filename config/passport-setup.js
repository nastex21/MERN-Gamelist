const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const keys = require("./keys");
const User = require("../models/user-model");

const strategyOptions = {
  returnURL: "http://localhost:5555/auth/steam/return",
  realm: "http://localhost:5555/",
  apiKey: keys.STEAM_KEY
}

module.exports = app => {

passport.use(
  new SteamStrategy(strategyOptions, (identifier, profile, done) => {
      profile.identifier = identifier;
      console.log(identifier);

      console.log("before user");

      let user = User.findOne({ id: profile.id });

      console.log("past user");

      if (!user) {
        user = new User({
          id: profile._json.steamid,
          name: profile._json.personaname,
          avatar: profile._json.avatar
        }).save();
      }

      console.log("past !user");
      return done(null, {id: user.id, name: user.name, avatar: user.avatar});
    }
  )
);
app.use(passport.initialize());
  }