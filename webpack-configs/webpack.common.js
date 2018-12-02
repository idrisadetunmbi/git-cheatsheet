const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: [path.resolve(__dirname, '..', 'src/client/index.jsx')],
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Groceriffic App',
      template: path.resolve(__dirname, '..', 'src/client/index.html'),
    }),
    new CleanWebpackPlugin(['build/client']),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'build/client'),
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.m?jsx?$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
      },
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
