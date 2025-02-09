const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date_signup: {
    type: Date
  },
  address: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
