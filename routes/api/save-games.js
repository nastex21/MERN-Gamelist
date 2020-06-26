const express = require("express");
const router = express.Router();
const User = require("../../models/user-model");

router.post("/", (req, res) => {


  //variables needed to add games
  const { user, game } = req.body;

  //variables needed to change values
  var gameID;
  const { flag, data, id } = req.body;
  if (flag) {
    gameID = data.game_id;
  }

  //used for changing the provider of the game
  if (flag == "blurToSave") {
    User.findOneAndUpdate(
      { _id: id, "games.game_id": gameID },
      {'games.$': data},
      function (err, data) {
        if (err){
          console.log(err)
        }
      }
    );
  } else {
    //used to adding games
    User.findOneAndUpdate(
      { _id: user.id, "games.game_id": { $nin: [game.game_id] } },
      {
        $push: {
          games: {
            $each: game,
            $position: 0,
          },
        },
      },
      {new: true},
      function (err, data) {
        res.send(data);

        if(err){
          res.send(err);
        }
      }
    );
  }
});

module.exports = router;
