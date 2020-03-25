const passport = require("passport");
const express = require("express");
const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:5556/dashboard";
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  console.log("req");
  console.log(req.session);
  res.json({
    success: true,
    message: "user has successfully authenticated",
    user: req.session.user,
    steamID: req.session.passport.user,
    cookies: req.cookies
  }); 
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

router.get(
    /^\/steam(\/return)?$/,
    passport.authenticate('steam', { failureRedirect: '/', successRedirect: CLIENT_HOME_PAGE_URL })); 


module.exports = router;
