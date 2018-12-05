import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import logger from 'morgan';
import mongoose from 'mongoose';
import path from 'path';

import config from './config';
import api from './routes';

require('dotenv').config();

const app = express();

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'client', 'index.html')));
} else if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  require('../../webpack-configs/express-middleware')(app);
}

const port = Number(config.PORT) || 3000;
const server = http.createServer(app).listen(port, () => {
  mongoose.connect(config.DATABASE_URL, { useNewUrlParser: true });
});

export default server;
