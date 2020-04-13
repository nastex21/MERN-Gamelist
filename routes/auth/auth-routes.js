const passport = require("passport");
const express = require("express");
const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:5556/dashboard";
const User = require("../../models/user-model");

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  console.log('/login/success');
   User.findById(req.session.user.id, function (err, user) {
    var steamNum = user.steamId;
    if (!steamNum) {
      req.session.user.steamID
    }
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: user.name,
      steamID: steamNum,
      games: user.games,
      steamGames: user.steamGames,
      cookies: req.cookies
    });  
  }); 
});

router.post('/login/success', (req, res) => {
  const { id } = req.body;
  User.findById(id, function (err, user) {
    var steamNum = user.steamId;
    if (!steamNum) {
      req.session.user.steamID
    }
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: user.name,
      steamID: steamNum,
      games: user.games,
      steamGames: user.steamGames,
      cookies: req.cookies
    });  
  }); 
})

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

  router.get(/^\/steam(\/return)?$/,
  passport.authenticate('steam', { failureRedirect: '/', successRedirect: CLIENT_HOME_PAGE_URL })); 

module.exports = router;
