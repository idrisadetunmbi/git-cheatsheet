import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import logger from 'morgan';
import mongoose from 'mongoose';

import config from './config';
import api from './routes';

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

app.use('/api', api);

const port = Number(config.PORT) || 3000;
http.createServer(app).listen(port, () => {
  mongoose.connect(config.DATABASE_URL, { useNewUrlParser: true });
});
