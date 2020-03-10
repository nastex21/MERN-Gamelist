const express = require("express");
const keys = require("../../config/keys");
const axios = require('axios');
const unirest = require("unirest");
const router = express.Router();

router.post("/", (req, res) => {
  const userID = req.body.value;
  var httpVar = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${keys.STEAM_KEY}&steamid=${userID}&include_appinfo=true&format=json`;
  try {
    console.log("try axios working");
    axios
      .get(httpVar)
      .then(data => {
        var gameData = data.data.response.games.map((item, key) => ({
          'game_num': key + 1,
          'game_appid': item.appid,
          'game_img': item.img_logo_url,
          'game_name': item.name,
          'game_system': 'PC',
          'provider': 'steam'
        }));
        res.send(gameData);
      })
      .catch(err => res.send(err));
  } catch (err) {
    console.error("GG", err);
  }
});

module.exports = router;