const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  entry: ['webpack-hot-middleware/client'],
  devtool: 'inline-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
