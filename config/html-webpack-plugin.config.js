const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  HtmlWebpackPluginList: [
    new HtmlWebpackPlugin({
      filename: 'sample.html',
      template: 'sample.html',
      chunks: ['sample'],
      inject: false
    })
  ]
}