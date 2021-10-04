const { merge } = require('webpack-merge');

const commonConfig = require('./conf/webpack.base.config.js');
const productionConfig = require('./conf/webpack.prod.config');
const developmentConfig =  require('./conf/webpack.dev.config');

module.exports = (env, args) => {
    switch(args.mode) {
        case 'development':
            return merge(commonConfig, developmentConfig);
        case 'production':
            return merge(commonConfig, productionConfig);
        default:
            throw new Error('No matching configuration was found!');
    }
}
