const mongoose = require('mongoose');

const dropper = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, default: '' },
  gender: { type: String, enum: [ 'male', 'female' ], required: true },
  district: { type: String, lowercase: true, trim: true, required: true },
  dateCreated: String,
  attendantId: { type: String, required: true }
});

module.exports = mongoose.model('dropper', dropper);
