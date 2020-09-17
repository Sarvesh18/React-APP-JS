const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


//https://webpack.js.org/guides/production/
module.exports = merge(common, [
    {
        mode: 'production',
        //devtool: 'source-map'
        optimization: {
            minimize: true,
            minimizer: [ new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
            splitChunks: {
                chunks: 'all',
                name: false,
            },
            runtimeChunk: {
                name: entrypoint => `runtime-${entrypoint.name}`,
            },
            nodeEnv: 'production'
        }
    },
    {
        //mode: 'production'
    }
])