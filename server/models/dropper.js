const mongoose = require('mongoose');

const dropper = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, enum: [ 'male', 'female' ] },
  district: { type: String },
  dateCreated: String
});

module.exports = mongoose.model('dropper', dropper);
