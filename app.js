const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config/config.json');
const chatbotApi = require('./api/controllers/chatbot');

app.use(morgan('dev'));
app.use(
  bodyParser.json({
    extended: true
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
app.options('*', cors());
mongoose.connect(config.connectionDatabase, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect to db successfully!');
  }
});

app.use('/chatbot', chatbotApi);

module.exports = app;
