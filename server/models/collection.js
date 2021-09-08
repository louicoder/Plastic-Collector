const mongoose = require('mongoose');
const { COMPANIES, MEASUREMENTS } = require('../Constants');

const collections = new mongoose.Schema({
  dropperId: { type: String, required: true },
  attendantId: { type: String, required: true },
  // name: { type: String, required: true },
  // phoneNumber: { type: String, required: true },
  // gender: { type: String, enum: [ 'male', 'female' ], required: true },
  district: { type: String, required: true },
  typesBreakdown: {
    type: [
      {
        company: {
          type: String,
          enum: COMPANIES,
          lowercase: true
          // trim: true
        },
        measurement: { type: String, enum: MEASUREMENTS },
        total: { type: String }
      }
    ]
  },
  // type: { type: String, required: true },
  dateCreated: String,
  totalweight: { type: String, required: true },
  totalCollection: { type: String, required: true }
});

module.exports = mongoose.model('collections', collections);
