var path = require("path");

module.exports = {
  entry: {
    app: ["./client/src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/public/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /.(jpg|png|svg)$/, loader: 'url-loader', options: { limit: 25000, }, },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: false,
    port: 9000
  }
  // proxy: {
  //   "/api": "http://localhost:3000"
  // }
};