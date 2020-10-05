var path = require("path");
var webpack = require("webpack");
var BundleTracker = require("webpack-bundle-tracker");

module.exports = {
  context : __dirname,
  entry : [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  './frontend/src/index.js'
  ],
  output : {
    path : path.resolve('./frontend/static/bundles/'),
    filename : "[name]-[hash].js",
    publicPath: 'http://localhost:3000/merowardrobe/frontend/static/bundles/',
  },
  plugins : [
    new webpack.HotModuleReplacementPlugin(),
    new BundleTracker({filename: './webpack-stats.json'}),
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|gif|woff(2)?|ttf|eot|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                name: './fonts/[hash].[ext]',
              },
          }
        ]
      }
    ]
  }
};