const path = require('path');
const webpack=require( 'webpack');

module.exports = {

  entry: {
    app:[
      './src/content.js',
      './src/settings.js',
      './src/utils.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'distribution/lib'),
  },
  // presets: ['@babel/preset-env'],
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}
};
