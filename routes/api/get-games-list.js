const express = require("express");
const keys = require("../../config/keys");
const router = express.Router();
const axios = require('axios');

router.post("/get-games-list", (req, res) => {
  const userID = req.body.value;
  console.log(userID);
  //res.send(data.data.response)
  var httpVar = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${keys.STEAM_KEY}&steamid=${userID}&include_appinfo=true&format=json`;
  try {
    console.log("try axios working");
    axios
      .get(httpVar)
      .then(data => res.send(data.data.response))
      .catch(err => res.send(err));
  } catch (err) {
    console.error("GG", err);
  }
});

module.exports = router;