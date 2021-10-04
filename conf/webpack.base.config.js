const webpack = require('webpack')
const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Собирает все css прикрепленные к js файлу и создает для низ отдельный файл
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');



// "Авто создание страниц" - находим название файлов(страниц) и для каждого вызываем HTMLWebpackPlugin
const pages = [];
const filter = ['base', 'room-page-template']
fs
    .readdirSync(path.resolve(__dirname, '../src/pages'))
    .filter((file) => {
      for (let fileName of filter) {
        if (file.indexOf(fileName) === 0) {
          return false
        }
      }
      return true;
    })
    .forEach((file) => {
      pages.push(file.split('/', 2));
    });

const htmlPlugins = pages.map(fileName => new HtmlWebpackPlugin({
  filename: `${fileName}.html`,
  template: `./pages/${fileName}/${fileName}.pug`,
  inject: 'body',
}));


// Функции
//
const filename = ext => `[name].bundle.${ext}`


// Конфиг
//
module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry:{
    "entry":'./entry.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: filename('js'),
    assetModuleFilename: 'assets/[name].[ext]',
    chunkFilename: '[name].js'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
    ]
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProgressPlugin(),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false}),
      new CopyWebpackPlugin({
        patterns: [{
            from: path.resolve(__dirname, '../src/assets/img'),
            to: path.resolve(__dirname, '../dist/images')
          },
          {
            from: path.resolve(__dirname, '../src/assets/fonts'),
            to: path.resolve(__dirname, '../dist/fonts')
          }]
      }),
      new MiniCssExtractPlugin({
        filename: filename('css'),
      })].concat(htmlPlugins)
};