const passport = require("passport");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:5556";

router.get("/steam", passport.authenticate("steam", { session: false }));

/* router.get('/steam/return', passport.authenticate('steam', { session: false }), (req, res) => {
  console.log("got to here!");
  const token = jwt.sign({ user: req.user }, process.env.SECRET, { expiresIn: '2h' });
  res.render(CLIENT_HOME_PAGE_URL, { jwtToken: token, clientUrl: CLIENT_HOME_PAGE_URL });
}); */

router.get(
  "/steam/return",
  passport.authenticate("steam", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
);

module.exports = router;
