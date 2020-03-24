const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");
const opts = {};
const passport = require("passport");
const SteamStrategy = require("passport-steam");

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.SECRET;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
  
  passport.use(
    new SteamStrategy(
      {
        returnURL: "http://localhost:5555/auth/steam/return",
        realm: "http://localhost:5555/",
        apiKey: keys.STEAM_KEY
      },
      async (identifier, profile, done) => {
        console.log('profile id');
        console.log(profile.id);
        done(null, profile.id);
      }
    )
  )
};

