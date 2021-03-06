const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  steamGames: {
    type: Array
  },
  games: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  },
  steamId: {
    type: String
  }
});
module.exports = User = mongoose.model("users", UserSchema);
