const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./src/content.js', './src/settings.js', './src/utils.js'],
  },
  output: {
    filename: 'bundle.js',
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
