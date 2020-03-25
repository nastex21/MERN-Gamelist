const express = require("express");
const router = express.Router();
const passport = require('passport');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load User model
const User = require("../../models/user-model");

router.post("/register", (req, res) => {
  const { name, password} = req.body;
  User.findOne({ name: name }).then(user => {
    if (user) {
      return res.status(400).json({ name: "Username or email already exists" });
    } else {
      const newUser = new User({
        name: name,
        password: password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
         if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
 
              User.findOne({name: name}, function(err, results){
                if (err) throw err;

                const user_id = results.id;
        
                 req.login(user_id, function(err){
                  res.json(user);
                }) 
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { name, password } = req.body;
  console.log(name)
  console.log(password);
  // Find user by name
  User.findOne({name: name}).then(user => {
    console.log('user');
    console.log(user);
    // Check if user exists
    if (!user) {
      return res.status(404).json({ Namenotfound: "Username or email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload

        const payload = {
          id: user.id,
          name: user.name,
          games: user.games
        };

        //Store session
        const sessUser = { id: user.id, name: user.name };
        req.session.user = sessUser; // Auto saves session data in mongo store  
        req.session.save();

        req.login(user, function(err) {
          if (err) { return next(err); }
          jwt.sign(payload, keys.SECRET,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                user: payload
              })
            }
          );
        });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post('/logout', function(req, res){
  
  const { name, id } = req.session;

  req.session.destroy((err) => {
    //delete session data from store, using sessionID in cookie
    if (err) throw err;
    res.clearCookie('connect.sid',  {domain: "localhost", path: '/'}).status(200).send('Ok.');
  });

  req.logout();
});

passport.serializeUser((user_id, done) => {

  done(null, user_id);
});

passport.deserializeUser((user_id, done) => {

  done(null, user_id);
});

module.exports = router;