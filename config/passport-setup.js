const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const keys = require("./keys");
const User = require("../models/user-model");

/* // serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
}); */

module.exports = app => {

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:5555/auth/steam/return",
      realm: "http://localhost:5555/",
      apiKey: keys.STEAM_KEY
    },
    (identifier, profile, done) => {
      profile.identifier = identifier;
      console.log(identifier);

      console.log("before user");

      let user = await User.findOne({ id: profile.id });

      console.log("past user");
      console.log(user);

      if (!user) {
        user = await new User({
          id: profile._json.steamid,
          name: profile._json.personaname,
          avatar: profile._json.avatar
        }).save();
      }

      console.log("past !user");
      return done(null, user);
    }
  )
);
app.use(passport.initialize());
  }