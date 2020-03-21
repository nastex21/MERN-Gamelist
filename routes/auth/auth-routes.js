const passport = require("passport");
const express = require("express");
const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:5556/dashboard";

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

<<<<<<< HEAD
// auth with steam
router.get("/steam/:id", function (req, res, next) {
  console.log('req.params!');
  console.log(req.params);
  req.session.firstquery = 'Bye!';
  return next()
}, passport.authenticate("steam")); 

/*  router.get('/steam', passport.authenticate('steam')); */
/* 
=======
  // auth with steam
  router.get("/steam/:id", function(req, res, next){
  req.session.lastQuery = 'Hello'
  return next()
  }, 
  passport.authenticate("steam"));

>>>>>>> parent of c0b5a0e... Session works! Now just need to implement it correctly.
  router.get(
    "/steam/return",
    passport.authenticate("steam", {
      successRedirect: CLIENT_HOME_PAGE_URL,
      failureRedirect: "/auth/login/failed"
    })
<<<<<<< HEAD
  ); */

router.get('/steam/return',
  passport.authenticate('steam', { failureRedirect: '/login/failed' }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log('req.session from /steam/return');
    req.session.lastQuery = "Hi!";
    console.log(req.session);
    res.redirect(CLIENT_HOME_PAGE_URL);
  });
=======
  );
>>>>>>> parent of c0b5a0e... Session works! Now just need to implement it correctly.

module.exports = router;