const express = require('express');
const app = express();
app.use(express.json());

// Database connection
require('./connection')();
// Routes imports

// Routes setup
const { collection, account, dropper, regcodes } = require('./routes');
app.use('/collections', collection);
app.use('/account', account);
app.use('/dropper', dropper);
app.use('/codes', regcodes);

module.exports = app;
