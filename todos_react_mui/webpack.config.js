const path = require('path');
const MiniCssExtractingPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: ['babel-loader'],
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractingPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractingPlugin(),
    // new ESLintPlugin({
    //   extensions: ['js', 'jsx'],
    // }),
  ],
};

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractingPlugin = require('mini-css-extract-plugin');
// // const webpack = require('webpack');
//
// // const ESLintPlugin = require('eslint-webpack-plugin');
//
// module.exports = {
//   mode: 'development',
//   output: {
//     path: path.join(__dirname, '/dist'),
//     filename: 'index.bundle.js',
//   },
//   devServer: {
//     static: path.resolve(__dirname, 'dist'),
//     port: 9000,
//     compress: true,
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /nodeModules/,
//         use: [
//           {
//             loader: 'babel-loader',
//             options: {
//               presets: [
//                 [
//                   '@babel/preset-env',
//                   {
//                     targets: 'defaults',
//                   },
//                 ],
//                 '@babel/preset-react',
//               ],
//             },
//           },
//         ],
//       },
//       {
//         test: /\.s[ac]ss$/i,
//         use: [MiniCssExtractingPlugin.loader, 'css-loader', 'sass-loader'],
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({ template: './src/index.html' }),
//     new MiniCssExtractingPlugin(),
//     // new ESLintPlugin({
//     //   extensions: ['js', 'jsx'],
//     // }),
//   ],
// };
