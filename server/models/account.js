const mongoose = require('mongoose');
const { DISTRICTS } = require('../Constants');

const account = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true, trim: true },
  gender: { type: String, enum: [ 'male', 'female' ] },
  imageUrl: { type: String, default: '' },
  district: { type: String, default: '', lowercase: true, trim: true, enum: DISTRICTS, required: true },
  dateCreated: String
});

module.exports = mongoose.model('account', account);
