const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry:{
    filename: path.resolve(__dirname, './src/index.js'),
  },
  output:{
    path: path.resolve(__dirname, './html'),
    filename: '[name].bundle.js',
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './html'),
    open: true,
    compress: true,
    hot: true,
    port: 8082,
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use:['babel-loader'],
      },
      {
        test: /\.jsx$/,
        use:['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ],
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: 'MyReactApp',
      template: path.resolve(__dirname, './src/template.html'),
      filename: 'index.html'
    }),
    //new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
