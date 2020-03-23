const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load User model
const User = require("../../models/user-model");

router.post("/register", (req, res) => {
  console.log('triggered');
  console.log(req.body);
  User.findOne({ name: req.body.name }).then(user => {
    console.log('user');
    console.log(user);
    if (user) {
      return res.status(400).json({ name: "Username or email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        password: req.body.password
      });
      console.log('inside register and after newUser');
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
         if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => 
              User.findById(user.id, function(err, results){
                console.log('inside findById')
                console.log(results);
                const user_id = results.id;
                req.login(user_id, function(err){
                  console.log('req.login');
                  res.redirect('/');
                  })
                })
            )
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  

  const name = req.body.name;
  const password = req.body.password;
  // Find user by name
  User.findOne({ name }).then(user => {
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
        const user_id = user.id;
        const payload = {
          id: user.id,
          name: user.name,
          games: user.games
        };
        // Sign token
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
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

/* User.findById(user.id, function(err, results){
  console.log('inside findById');
  console.log(results);
  const user_id = results.id;
  req.login(user_id, function(err){
    res.redirect('/');
  }); */

passport.serializeUser((user_id, done) => {
  done(null, user_id);
});

passport.deserializeUser((user_id, done) => {
  done(null, user_id);
});

module.exports = router;