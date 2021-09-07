const mongoose = require('mongoose');

const collections = new mongoose.Schema({
  dropperId: { type: String, required: true },
  attendantId: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, enum: [ 'male', 'female' ], required: true },
  district: { type: String },
  typesBreakdown: { type: Array },
  type: { type: String, required: true },
  dateCreated: String,
  totalweight: { type: String, required: true }
});

module.exports = mongoose.model('collections', collections);
