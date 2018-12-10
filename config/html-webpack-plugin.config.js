const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  HtmlWebpackPluginList: [
    new HtmlWebpackPlugin({
      filename: 'test.html',
      template: 'test.html',
      chunks: ['test'],
      inject: false
    })
  ]
}