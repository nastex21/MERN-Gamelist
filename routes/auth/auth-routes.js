const passport = require("passport");
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:5556";
/* 
// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with steam
router.get("/steam", passport.authenticate("steam"));

// redirect to home page after successfully login via steam
router.get(
  "/steam/return",
  passport.authenticate("steam", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
); */

router.get('/steam', passport.authenticate('steam', { session: false }));

router.get('/steam/return', passport.authenticate('steam', { session: false }), (req, res) => {
  const token = jwt.sign({ user: req.user }, process.env.SECRET, { expiresIn: '2h' });
  res.render('authenticated', { jwtToken: token, clientUrl: CLIENT_HOME_PAGE_URL });
});


module.exports = router;