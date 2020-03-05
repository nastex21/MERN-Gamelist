const express = require("express");
const keys = require("../../config/keys");
const axios = require('axios');
const router = express.Router();

router.get("/", (req, res) => {
    console.log("it's running")
  
    axios({
      "method":"GET",
      "url":"https://rawg-video-games-database.p.rapidapi.com/platforms",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"rawg-video-games-database.p.rapidapi.com",
      "x-rapidapi-key":"d489867ee4mshf63cc601354da98p1cd559jsn1abd0e24d1f8"
      }
      })
      .then((response)=>{
        console.log(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
  });

  
module.exports = router;