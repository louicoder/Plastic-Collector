const mongoose = require('mongoose');

const account = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String },
  gender: { type: String, enum: [ 'male', 'female' ] },
  imageUrl: { type: String, default: '' },
  district: { type: String, default: '' },
  dateCreated: String
});

module.exports = mongoose.model('account', account);
