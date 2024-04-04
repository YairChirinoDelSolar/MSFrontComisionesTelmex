const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  output: {
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env.BACKEND_SERVER_COMISIONES': JSON.stringify(
        process.env.BACKEND_SERVER_COMISIONES
      )
    })
  ],
  devServer: {
    port: process.env.PORT || 8000,
    open: true,
    historyApiFallback: true,
    client: {
      logging: 'info',
      overlay: true
    },
    proxy: {
      '/api': process.env.NODE_SERVER_URL || 'http://localhost:8001'
    }
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: 'http://localhost:4000'
    })
  }
}
