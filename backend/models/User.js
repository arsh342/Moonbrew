const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  phone: String,
  address: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema); 