const path = require('path');
// const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/content.js', './src/utils.js'],
    settings: ['./src/settings.js', './src/utils.js'],
    background: ['./src/background.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'distribution/lib'),
  },
  devtool: 'inline-source-map',
  plugins: [
    // new ESLintPlugin({
    //   // /*options*/ useEslintrc: true,
    // }),
    new CopyPlugin({
      patterns: [
        {
          from: './node_modules/jquery/dist/jquery.min.js',
          to: path.resolve(__dirname, 'distribution/dependencies'),
          force: true,
        },
        {
          from: './node_modules/jquery-ui-dist/jquery-ui.min.js',
          to: path.resolve(__dirname, 'distribution/dependencies'),
          force: true,
        },
        {
          from: './node_modules/bootstrap/dist/js/bootstrap.min.js',
          to: path.resolve(__dirname, 'distribution/dependencies'),
          force: true,
        },
        {
          from: './node_modules/bootstrap/dist/css/bootstrap.min.css',
          to: path.resolve(__dirname, 'distribution/dependencies'),
          force: true,
        },
      ],
    }),
  ],
};
