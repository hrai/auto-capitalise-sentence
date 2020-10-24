const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
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
  plugins: [
    new ESLintPlugin({
      // /*options*/ useEslintrc: true,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
