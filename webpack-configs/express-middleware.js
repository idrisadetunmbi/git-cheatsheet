const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.dev');

const compiler = webpack(webpackConfig);

module.exports = (app) => {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    logLevel: 'error',
  }));
  app.use(webpackHotMiddleware(compiler));
};
