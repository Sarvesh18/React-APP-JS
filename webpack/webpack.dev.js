const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, [
    {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            //contentBase: './dist', //public, build
            //compress: true,
            //https: false,

            host: process.env.HOST || '0.0.0.0',
            port: process.env.PORT || 9000,
            
            //open: true,
            hot: true,
            historyApiFallback: true,
        },
    },
    {
        //mode: 'development'
    }
])