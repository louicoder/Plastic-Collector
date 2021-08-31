const express = require('express');
const app = express();
app.use(express.json());

// Database connection
require('./connection')();
// Routes imports

// Routes setup

module.exports = app;
