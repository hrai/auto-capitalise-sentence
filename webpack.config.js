const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: ['./src/content.js', './src/utils.js'],
    settings: ['./src/settings.js', './src/utils.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'distribution/lib'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new ESLintPlugin({
      // /*options*/ useEslintrc: true,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './node_modules/jquery/dist/jquery.min.js',
          to: path.resolve(__dirname, 'distribution/dependencies',
        },
      ],
    }),
  ],
};
