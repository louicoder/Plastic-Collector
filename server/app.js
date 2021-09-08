const express = require('express');
const app = express();
app.use(express.json());

// Database connection
require('./connection')();
// Routes imports

// Routes setup
const { collection, account, dropper } = require('./routes');
app.use('/collection', collection);
app.use('/account', account);
app.use('/dropper', dropper);

module.exports = app;
