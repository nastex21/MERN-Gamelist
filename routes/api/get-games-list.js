const express = require("express");
const keys = require("../../config/keys");
const axios = require("axios");
const unirest = require("unirest");
const router = express.Router();
const User = require("../../models/user-model");

router.post("/steam", (req, res) => {
  
  const steamID = req.session.passport.user;
  const savedUser = req.session.user.id;

  var httpVar = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${keys.STEAM_KEY}&steamid=${steamID}&include_appinfo=true&format=json`;
  try {
    console.log("try axios working");
    axios
      .get(httpVar)
      .then(data => {
        console.log("its in the then");
        var gameData = data.data.response.games.map((item, key) => ({
          game_num: key + 1,
          game_appid: item.appid,
          game_img: item.img_logo_url,
          game_name: item.name,
          game_system: "PC",
          provider: "steam"
        }));
        if (savedUser) {
          User.findByIdAndUpdate(
            savedUser,
            { $set: { steamId: steamID, steamGames: gameData } },
            { new: true },
            (err, result) => {
              res.send(gameData);

              if (err) {
                console.log("err");
                console.log(err);
              }
            }
          );
        } else {
          res.send(gameData);
        }
      })
      .catch(err => res.send(err));
  } catch (err) {
    console.error("GG", err);
  }
});

router.get("/db", (req, res) => {
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
    axios
      .get(urlWithPlatform, sendHeaders)
      .then(response => res.send(response.data))
      .catch(error => console.log(error));
  }
});

router.get("/user-db", (req, res) => {
  console.log("user-db");
  const { id, name } = req.query;
  console.log(id);
  console.log(name);
  User.findById(id, function(err, data) {
    console.log("data");
    console.log(data.length);
  });
});

module.exports = router;
