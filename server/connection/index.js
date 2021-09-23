var mongoose = require('mongoose');
require('dotenv').config();

// database test string.
// const dbURL = '';
const url = 'mongodb://127.0.0.1:27017/plastics';

// DEV Database string.
const connectWithRetry = () =>
  mongoose.connect(
    process.env.DB,
    // url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
      // useFindAndModify: false
    },
    (error) => {
      if (error) {
        console.log('Error', error);
        console.log('RECONNECTING TO MONGODB DATABASE...');
        return setTimeout(() => connectWithRetry(), 5000);
      }
      console.log(':::::::: CONNECTED TO DATBASE :::::::::');
    }
  );

module.exports = connectWithRetry;
