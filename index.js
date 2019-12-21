const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApp = require('./routes/movies');

moviesApp(app);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});