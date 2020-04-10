const express = require("express");
const router = express.Router();
const User = require("../../models/user-model");

router.post("/", (req, res) => {
  console.log("WOOOOT");
  console.log(req.body);
  const { user, game } = req.body;
  if (user) {
    const gameID = game[0].game_id;
  }
  const { flag, data, id } = req.body;
  console.log(flag);
  console.log(data);
  console.log(id);

  if (flag == 'blurToSave') {
    console.log('yes');
    User.findOne({ _id: id, 'games.game_id': data.game_id }, { 'games': data }, { new: true }, function (err, data) {
      console.log(data);
    });
  } else {
    User.findOneAndUpdate(
      { _id: user.id, "games.game_id": { $nin: [gameID] } },
      {
        $push: {
          games: {
            $each: game,
            $position: 0
          }
        }
      },
      function (err, data) {
        console.log("data");
        console.log(data);
        console.log(err);
      }
    );
  }

});

module.exports = router;
