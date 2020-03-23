const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load User model
const User = require("../../models/user-model");

router.post("/register", (req, res) => {

  User.findOne({ name: req.body.name }).then(user => {

    const { name, password} = req.body;
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
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { name, password } = req.body;
  console.log('name, password');
  console.log(name);
  console.log(password)
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
        const user_id = user.id;
        const payload = {
          id: user.id,
          name: user.name,
          games: user.games
        };

        //Store session
        const sessUser = { id: user.id, name: user.name };
        req.session.user = sessUser; // Auto saves session data in mongo store  

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

router.get('/logout', function(req, res){
  console.log('logout');
  req.session.destroy((err) => {
    //delete session data from store, using sessionID in cookie
    if (err) throw err;
    res.clearCookie("session-id"); // clears cookie containing expired sessionID
    res.send("Logged out successfully");
  });
});


module.exports = router;