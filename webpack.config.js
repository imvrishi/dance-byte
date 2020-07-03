const path = require("path");
const process = require("process");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, "src", "bin", "www.js"),
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    watchContentBase: true,
    clientLogLevel: "debug",
    noInfo: false,
    open: false,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".jsx", ".js"],
  },
  output: {
    filename: "main.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: "async-node",
  node: {
    __dirname: true,
    __filename: true,
  },
};
