const mongoose = require('mongoose');

const dropper = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, enum: [ 'male', 'female' ] },
  district: { type: String, lowercase: true, trim: true },
  dateCreated: String
});

module.exports = mongoose.model('dropper', dropper);
