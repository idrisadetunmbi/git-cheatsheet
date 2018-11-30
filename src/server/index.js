import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import logger from 'morgan';

import config from './config';

require('dotenv').config();

const app = express();

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Git Cheatsheet',
  });
});

const port = Number(config.PORT) || 3000;
http.createServer(app).listen(port);
