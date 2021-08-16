const app = require('./app');
require('dotenv').config();

app.listen(process.env.PORT, () => {
  console.log(`:::: SERVER RUNNINg ON PORT: ${process.env.PORT}`);
});
