const express = require("express");
const keys = require("../../config/keys");
const axios = require('axios');
const unirest = require("unirest");
const router = express.Router();

router.post("/steam", (req, res) => {
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

router.get('/db', (req, res) => {
  const { id, system, name } = req.query;

  var url = `https://rawg-video-games-database.p.rapidapi.com/games?page_size=10&search=${name}&page=1`;
  var urlWithPlatform = `https://rawg-video-games-database.p.rapidapi.com/games?page_size=10&search=${name}&platforms=${id}&page=1`;

  console.log(url);

  var sendHeaders = {
    headers: {
      "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
      "x-rapidapi-key": keys.RAPID_KEY
    }
  };

  if (!system) {
    console.log("empty");
  } else {
    axios.get(urlWithPlatform, sendHeaders).then(response => res.send(response.data)).catch(error => console.log(error));
  }
});

module.exports = router;