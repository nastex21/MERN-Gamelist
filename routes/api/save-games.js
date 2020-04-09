const express = require("express");
const router = express.Router();
const User = require("../../models/user-model");

router.post("/", (req, res) => {
  console.log("WOOOOT");
  console.log(req.body);
  const { user, game } = req.body;
  const gameID = game[0].game_id;
  console.log(user.id);
  console.log(game);
  console.log(gameID);
  /*   { 
    "$push": {
        "post_IDs": {
            "$each": [articles],
            "$position": 0
         }
     }
},
{ new: true}, */

  /* "games.id": { $nin: [gameID] } },
    {
      $addToSet: {
        games: game
      }
    } */
  User.findOneAndUpdate(
    { _id: user.id}, { unique: true },
    {
      $push: {
        games: {
          $each: game,
          $position: 0
        }
      }
    },
    function(err, data) {
      console.log("data");
      console.log(data);
      console.log(err);
    }
  );
});

module.exports = router;
