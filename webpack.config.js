const path = require('path');

module.exports = {
  entry: {app:[ './src/content.js','./src/settings.js',
    './src/utils.js']},
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'distribution/lib'),
  },
};
