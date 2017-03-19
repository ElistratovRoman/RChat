import { resolve } from 'path'
import webpack from 'webpack'

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?quiet=true',
    './app.js'
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx', '.sass'],
    modules: [resolve('./src'), 'node_modules']
  },

  context: resolve(__dirname, 'src'),

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.(html|jpg)$/,
        loader: 'file-loader?name=[name].[ext]',
      },

      {
        test: /\.sass$/,
        use: [
          { loader: "style-loader" },

          { loader: "css-loader" },

          {
            loader: "sass-loader",
            options: {
              includePaths: [resolve(__dirname, 'src')]
            }
          }
        ]
      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },

      {
        test: /\.svg$/,
        use: [
          { loader: "svg-sprite-loader" },

          // { loader: "svgo-loader" }
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}