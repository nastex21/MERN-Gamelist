const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const keys = require("./keys");
const User = require("../models/user-model");

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
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
});

passport.use(
  new SteamStrategy(
    {
      returnURL: "/auth/steam/return",
      realm: "http://localhost:55556/",
      apiKey: keys.STEAM_KEY
    },
    async (token, tokenSecret, profile, done) => {
      // find current user in UserModel
      const currentUser = await User.findOne({
        steamID: profile._json.id_str
      });
      // create new user if the database doesn't have this user
      if (!currentUser) {
        const newUser = await new User({
          name: profile._json.name,
          screenName: profile._json.screen_name,
          steamID: profile._json.id_str,
          profileImageUrl: profile._json.profile_image_url
        }).save();
        if (newUser) {
          done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  )
);
