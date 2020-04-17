const express = require("express");
const keys = require("../../config/keys");
const axios = require("axios");
const unirest = require("unirest");
const router = express.Router();
const User = require("../../models/user-model");
var gameData;

router.post("/steam", (req, res) => {
  console.log("inside /steam");
  console.log(req.body);

  var steamID = req.body.steamID;
  var savedUser; //database user ID

  //Auth: req.session.user.id works for user who signed in through the passport and hasn't registered their steam ID yet.
  //Auth: works for both sign in through passport and manually input your steam ID
  if (req.session.user.id) {
    savedUser = req.session.user.id;
  }

  /*   var steamID = req.body.steamID;
  var savedUser = req.body.user;
  if (req.body.creditentials !== ''){
    savedUser = req.body.creditentials.id
  }

  if (!steamID) {
    steamID = req.session.passport.user;
  }  */
  console.log(req.session);

  console.log(steamID);
  console.log(savedUser);

  var httpVar = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${keys.STEAM_KEY}&steamid=${steamID}&include_appinfo=true&format=json`;
  try {
    console.log("try axios working");
    axios
      .get(httpVar)
      .then((data) => {
        console.log("its in the then");
        var gameData = data.data.response.games.map((item, key) => ({
          game_num: key + 1,
          game_appid: item.appid,
          game_img: item.img_logo_url,
          game_name: item.name,
          game_system: "PC",
          provider: "steam",
        }));
        if (savedUser) {
          User.findByIdAndUpdate(
            savedUser,
            { $set: { steamId: steamID, steamGames: gameData } },
            { new: true },
            (err, result) => {
              res.send(result);

              if (err) {
                res.send(err);
              }
            }
          );
        } else {
          res.send(gameData);
        }
      })
      .catch((err) => res.send(err));
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
      "x-rapidapi-key": keys.RAPID_KEY,
    },
  };

  if (!system) {
    console.log("empty");
  } else {
    axios
      .get(urlWithPlatform, sendHeaders)
      .then((response) => res.send(response.data))
      .catch((error) => console.log(error));
  }
});

router.get("/user-db", (req, res) => {
  console.log("user-db");
  const { id, name } = req.query;
  console.log(id);
  console.log(name);
  User.findById(id, function (err, data) {
    console.log("data");
    console.log(data.length);
  });
});

router.post("/updateSteam", (req, res) => {
  const { steamId, dbid } = req.body;
  var httpVar = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${keys.STEAM_KEY}&steamid=${steamId}&include_appinfo=true&format=json`;

  try {
    console.log("try axios working");
    axios
      .get(httpVar)
      .then((data) => {
        gameData = data.data.response.games.map((item, key) => ({
          game_num: key + 1,
          game_appid: item.appid,
          game_img: item.img_logo_url,
          game_name: item.name,
          game_system: "PC",
          provider: "steam",
        }));

        console.log(gameData.length);
        if (dbid) {
          User.findByIdAndUpdate(
            dbid,
            { $set: { steamGames: gameData } },
            { new: true },
            (err, result) => {
              res.send(gameData);

              if (err) {
                console.log("err");
                console.log(err);
              }
            }
          );
        }
      })
      .catch((err) => res.send(err));
  } catch (err) {
    console.error("GG", err);
  }
});

module.exports = router;
