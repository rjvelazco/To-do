const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    mode: "development",
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()]
    },
    module: {
        rules: [{
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false,
                }
            }, {
                test: /\.css$/i,
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
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [{
                from: 'src/assets',
                to: 'assets/'
            }]
        })
    ]
}