const express = require("express");
const router = express.Router();
const User = require("../../models/user-model");

router.post("/", (req, res) => {
  const gameIdArr = req.body;
  User.findByIdAndUpdate(
    req.session.user.id,
    { $pull: { games: { game_id: { $in: gameIdArr } } } },
    function (err, data) {
      res.send(data);
      if (err) {
        console.log(err);
        res.send(err);
      }
    }
  );
});

module.exports = router;
