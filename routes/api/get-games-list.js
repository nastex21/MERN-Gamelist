const express = require("express");
const keys = require("../../config/keys");
const router = express.Router();
const axios = require('axios');
const unirest = require("unirest");

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

router.post("/get-custom-games", (req, res) => {

  const data = req.body.value;
  console.log(data);
  var req = unirest("GET", "https://rawg-video-games-database.p.rapidapi.com/developers/%7Bid%7D");

  req.headers({
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    "x-rapidapi-key": "d489867ee4mshf63cc601354da98p1cd559jsn1abd0e24d1f8"
  });


  req.end(function (res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
  });
})

module.exports = router;