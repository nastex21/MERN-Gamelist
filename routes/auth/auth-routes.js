const passport = require("passport");
const express = require("express");
const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:5556";

router.get("/steam", passport.authenticate("steam", { session: false }));

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

//auth with GOG
router.get(
  "/gog",
  passport.authenticate("oauth2", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ status: "failed", error: "Invalid credentials" });
    }

    console.log(err)
    console.log(user)
    console.log(info)
  })
);

router.get("/gog/return", (req, res) => {
  console.log("reached it");
  res.send("You've reach the callback uri");
});

module.exports = router;
