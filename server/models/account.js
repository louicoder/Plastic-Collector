const mongoose = require('mongoose');

const account = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true, trim: true },
  email: { type: String, unique: true, lowercase: true, trim: true },
  gender: { type: String, enum: [ 'male', 'female' ] },
  imageUrl: { type: String, default: '' },
  district: { type: String, default: '', lowercase: true, trim: true },
  dateCreated: String
});

module.exports = mongoose.model('account', account);
