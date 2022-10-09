const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractingPlugin = require('mini-css-extract-plugin')
const webpack = require("webpack")

const ESLintPlugin = require("eslint-webpack-plugin");
module.exports = {
    // Where files should be sent once they are bundled
    mode: "development",
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js'
    },
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 9000,
        // hot: true,
        compress: true,
    },
    // Rules of how webpack will take our files, complie & bundle them for the browser
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /nodeModules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    "targets": "defaults"
                                }],
                                '@babel/preset-react'
                            ]
                        }
                    }
                ],

            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractingPlugin.loader, 'css-loader', "sass-loader"]
            }
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' }),
        new MiniCssExtractingPlugin(),
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
        }),
        new webpack.HotModuleReplacementPlugin()],
}