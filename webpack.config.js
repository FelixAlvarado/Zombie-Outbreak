var path = require('path');

module.exports = {
  context: __dirname,
  entry: "./javascript/outbreak.js",
  output: {
    path: path.resolve(__dirname),
  	filename: "bundle.js"
  },
  devtool: 'source-map',
}
;
