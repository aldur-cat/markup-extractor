const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  HtmlWebpackPluginList: [
    new HtmlWebpackPlugin({
      filename: 'sample-main-page.html',
      template: 'sample-main-page.html',
      chunks: ['sample-main-page', 'sample-sub-page'],
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'sample-sub-page.html',
      template: 'sample-sub-page.html',
      chunks: ['sample-sub-page'],
      inject: false
    })
  ]
}