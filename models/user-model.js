const mongoose = require('mongoose');
mongoose.set('debug', true);

const userSchema = new mongoose.Schema({
  steamId: {
    type: String
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);