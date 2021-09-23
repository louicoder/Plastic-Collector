const Mongoose = require('mongoose');

const codeSchema = new Mongoose.Schema({
  code: { type: String, required: true },
  dateCreated: { type: String },
  userId: String
});

module.exports = Mongoose.model('regcodes', codeSchema);
