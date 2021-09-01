const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  dateCreated: String,
  phoneNumber: String,
  region: String,
  name: { type: String, required: true }
});
