/**
 * 모듈 import
 */
const fs = require('fs');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { HtmlWebpackPluginList } = require('./config/html-webpack-plugin.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
const staticBasePath = path.resolve(projectBasePath, STATIC_COPY_FOLDER)

module.exports = (env, options) => {
  const isDevEnv = options.mode !== 'production';
  const config = {
    mode: 'none',
    entry: {
      'sample': path.resolve(assetsBasePath, 'scss','sample.scss')
    },
    output: {
      path: outputBasePath,
      filename: isDevEnv ? `./${BUNDLE_SCRIPT_FOLDER}/[name].js` : `../${BUNDLE_SCRIPT_FOLDER}/[name].js`,
      publicPath: isDevEnv ? '/src/' : ''
    },
    plugins: [
      !isDevEnv ? new CleanWebpackPlugin([
        BUNDLE_OUTPUT_FOLDER, 
        BUNDLE_SCRIPT_FOLDER
      ]) : new CleanWebpackPlugin([]),
      fs.existsSync(staticBasePath) ? new CopyWebpackPlugin([
        {
          from: staticBasePath,
          to: outputBasePath,
          ignore: ['.*']
        }
      ]) : new CopyWebpackPlugin([]),
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
            isDevEnv ? { 
              loader: 'style-loader',
              options: {
                sourceMap: true
              }
            } : { 
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
            { 
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            { 
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                outputStyle: 'expanded'
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]?[hash:7]',
                useRelativePath: true,
                outputPath: '',
                limit: 10000
              }
            }
          ]
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]?[hash:7]',
                useRelativePath: true,
                outputPath: '',
                limit: 10000
              }
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]?[hash:7]',
                useRelativePath: true,
                outputPath: '',
                limit: 10000
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        '@': assetsBasePath,
        '~': projectBasePath,
      }
    },
    devServer: {
      openPage: 'src/'
    }
  }
  return config;
}
