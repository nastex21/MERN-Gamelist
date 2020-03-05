const express = require("express");
const keys = require("../../config/keys");
const axios = require('axios');
const router = express.Router();

router.get("/", (req, res) => {
    console.log("it's running")
  
    const platformURL = "https://rawg-video-games-database.p.rapidapi.com/developers/%7Bid%7D";
  
    const headersNeeded = {
      "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
      "x-rapidapi-key": keys.RAPID_KEY
    };
  
    try {
      console.log("try axios working");
      axios
        .get(platformURL, { headers: headersNeeded })
        .then(data => console.log(data))
        .catch(err => res.send(err));
    } catch (err) {
      console.error("GG", err);
    }
  });

  
module.exports = router;