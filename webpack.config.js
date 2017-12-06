const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-gridlex.js'
  },
  module: {
    rules: []
  }
};

module.exports = config;