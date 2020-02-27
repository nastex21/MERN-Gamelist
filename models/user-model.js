const mongoose = require('mongoose');

console.log("initialized");

const userSchema = new mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  }
});

module.exports = mongoose.model('user', userSchema);