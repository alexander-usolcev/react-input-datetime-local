'use strict';

const SmartBannerPlugin = require('smart-banner-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

const packageJson = require('./package.json');

module.exports = {
    context: path.join(__dirname, 'source'),

    entry: {
        'input-datetime-local': './input-datetime-local.js',
        'app': './app.js'
    },

    output: {
        path: path.join(__dirname, 'build'),
        filename: NODE_ENV === 'development' ? '[name].js' : '[name].min.js',
        publicPath: '/'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            DEBUG: NODE_ENV === 'development',
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),
        new SmartBannerPlugin({
            banner: `${packageJson.name} v${packageJson.version}\n\nAuthor: ${packageJson.author}\nDate: ${new Date().toLocaleString()}\n`,
            raw: false,
            entryOnly: true
        })
    ],

    resolve: {
        extensions: ['.js'],
        unsafeCache: true
    },

    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['.js']
    },

    devtool: NODE_ENV === 'development' ? 'eval-source-map' : false,

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname),
    }
};

if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}