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
      async (req, identifier, profile, done) => {
        console.log('identifier');
        console.log(identifier);
        console.log('profile');
        console.log(profile);
        console.log('req.session.lastquery');
        console.log(req.session);

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
  )
};

