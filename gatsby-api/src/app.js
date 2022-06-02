const express = require('express');
const morgan = require('morgan');
// const helmet = require('helmet');
// const cors = require('cors');
require('dotenv').config();

// const whitelist = process.env.whitelist_url.split(',');

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
// app.use(helmet());

const corsOptions = {
  // TODO: Set origins
  origin: function (origin, callback) {
    callback(null, true);
    // if (!origin || whitelist.indexOf(origin) !== -1) {
    //   callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
  },
  methods: 'GET,PUT,POST,DELETE',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  // allowedHeaders: 'Content-Type, Authorization, Credentials'
  allowedHeaders: '*'
};

// app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.get('/ping', (req, res) => {
  res.json({
    message: 'OK'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
