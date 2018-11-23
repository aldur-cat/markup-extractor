/**
 * 모듈 import
 */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { HtmlWebpackPluginList } = require('./config/html-webpack-plugin.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * 프로젝트 각종 폴더 경로 설정
 */
const PROJECT_FOLDER = '';
const BUNDLE_OUTPUT_FOLDER = '__markup-result__';
const ASSETS_FOLDER = 'src';
const STATIC_COPY_FOLDER = 'static';
const BUNDLE_SCRIPT_FOLDER = 'js-dev';

/**
 * 기본 프로젝트 url 설정
 */
const projectBasePath = path.resolve(__dirname, PROJECT_FOLDER);
const outputBasePath = path.resolve(projectBasePath, BUNDLE_OUTPUT_FOLDER);
const assetsBasePath = path.resolve(projectBasePath, ASSETS_FOLDER);

module.exports = (env, options) => {
  const isDevEnv = options.mode !== 'production';
  const config = {
    mode: 'none',
    entry: {
      'sample-main-page': path.resolve(assetsBasePath, 'scss','sample-main.scss'),
      'sample-sub-page': path.resolve(assetsBasePath, 'scss', 'sample-sub.scss'),
      'sample-sub-page2': path.resolve(assetsBasePath, 'scss', 'sample-sub.scss')
    },
    output: {
      path: outputBasePath,
      filename: isDevEnv ? `./js-dev/[name].js` : `../js-dev/[name].js`,
      publicPath: isDevEnv ? '/' : ''
    },
    optimization: {
      minimizer: [
        // new OptimizeCSSAssetsPlugin({})  // minify 결과물을 원한다면 주석 제거
      ]
    },
    plugins: [
      new CleanWebpackPlugin([
        BUNDLE_OUTPUT_FOLDER, 
        BUNDLE_SCRIPT_FOLDER
      ]),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, STATIC_COPY_FOLDER),
          to: path.resolve(__dirname, BUNDLE_OUTPUT_FOLDER),
          ignore: ['.*']
        }
      ]),
      new MiniCssExtractPlugin({
        filename: './css/[name].css', 
        chunkFilename: './css/[id].css'
      }),
      ...HtmlWebpackPluginList
    ],
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDevEnv ? 'style-loader' : { 
              loader: MiniCssExtractPlugin.loader, 
              options: { 
                publicPath: '../' 
              } 
            },
            { 
              loader: 'css-loader', 
              options: { 
                sourceMap: true 
              } 
            },
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]?[hash:7]',
                outputPath: 'images/',
                limit: 10000
              }
            }
          ]
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)?$/,
          loader: 'url-loader',
          options: {
            name: '[name].[ext]?[hash:7]',
            outputPath: 'media/',
            limit: 10000
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          loader: 'url-loader',
          options: {
            name: '[name].[ext]?[hash:7]',
            outputPath: 'fonts/',
            limit: 10000
          }
        }
      ]
    }
  }
  return config;
}
