const express = require('express');
const app = express();
app.use(express.json());

// Database connection
require('./connection')();
// Routes imports

// Routes setup
const { collection, account, dropper } = require('./routes');
app.use('/api/collection', collection);
app.use('/api/account', account);
app.use('/api/dropper', dropper);

module.exports = app;
