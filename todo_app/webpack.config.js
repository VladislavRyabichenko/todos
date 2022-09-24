const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        main: path.resolve(__dirname, "./index.js")
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'output.bundle.js',
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 9000,
        hot: true,
        compress: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './template.html'),
            filename: "index.html"
        }),
        new CleanWebpackPlugin(),
    ],
    module : {
        rules: [
            //JavaScript
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            // fonts and SVG
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },

            // CSS, SASS
            // !! MiniCssExtractPlugin instead style-loader for production
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ]
    }

}
