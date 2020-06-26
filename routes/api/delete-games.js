const express = require("express");
const router = express.Router();
const User = require("../../models/user-model");

router.post("/", (req, res) => {
  const gameIdArr = req.body;
  User.findByIdAndUpdate(
    req.session.user.id,
    { $pull: { games: { game_id: { $in: gameIdArr } } } },
    {new: true},
    function (err, data) {
      res.send(data);
      if (err) {
        res.send(err);
      }
    }
  );
});

module.exports = router;
