const passport = require("passport");
const express = require("express");
const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:5556";

router.get("/steam", passport.authenticate("steam", { session: false }));

/* router.get('/steam/return', passport.authenticate('steam', { session: false }), (req, res) => {
  console.log("got to here!");
  const token = jwt.sign({ user: req.user }, process.env.SECRET, { expiresIn: '2h' });
  res.render(CLIENT_HOME_PAGE_URL, { jwtToken: token, clientUrl: CLIENT_HOME_PAGE_URL });
}); */

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

// auth with steam
router.get("/steam", passport.authenticate("steam"));

router.get(
  "/steam/return",
  passport.authenticate("steam", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
);

module.exports = router;
