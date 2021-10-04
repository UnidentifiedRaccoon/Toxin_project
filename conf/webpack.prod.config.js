const path = require('path');

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
    // target: 'browserslist',

}