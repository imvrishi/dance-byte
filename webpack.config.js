const path = require("path");
const process = require("process");
const nodeExternals = require("webpack-node-externals");
const swaggerJsdocSyncWebpackPlugin = require("swagger-jsdoc-sync-webpack-plugin");
const package = require("./package.json");

module.exports = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
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
  plugins: [
    new swaggerJsdocSyncWebpackPlugin({
      swagger: {
        openapi: "3.0.0",
        info: {
          title: "Dance Byte API",
          // termsOfService: "https://path.to.terms",
          contact: {
            name: "Rishikesh Vishwakarma",
            // url: "https://path.to.support",
            email: "imvrishi@gmail.com",
          },
          description:
            "These apis are used to provide functionality to Dance Byte app",
          version: package.version,
          tags: {
            name: "API",
            description: "API for Dance Byte",
          },
        },
      },
      prettyJson: true,
    }),
  ],
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
