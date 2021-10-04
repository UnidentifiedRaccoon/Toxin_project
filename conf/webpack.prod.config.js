const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const filename = ext => `[name].bundle.${ext}`


module.exports = {
    mode: "production",
    entry:{
        "entry": ['@babel/polyfill','./entry.js'],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: filename('js'),
        assetModuleFilename: 'assets/[name][ext]',
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all'
        },
        minimizer: [
          new OptimizeCssAssetsWebpackPlugin(),
          new TerserWebpackPlugin(),
        ]
    },
    target: `browserslist:${path.resolve(__dirname, '../.browserslistrc')}`,
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
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
        ]
    },

}