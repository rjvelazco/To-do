const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    mode: "production",
    entry: {
        index: './src/index.js',
    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
    },
    output: {
        filename: 'name.[fullhash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
            }, {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: true,
                }
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpge|gif)/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [{
                from: 'src/assets',
                to: 'assets/'
            }]
        }),
        new CleanWebpackPlugin(),
    ]
}