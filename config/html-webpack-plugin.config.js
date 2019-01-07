const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  HtmlWebpackPluginList: [
    new HtmlWebpackPlugin({
      filename: 'sample.html',
      template: 'src/sample.html',
      chunks: ['common', 'sample'],
      inject: false
    })
  ]
}