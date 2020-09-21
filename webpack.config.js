const webpack = require('webpack');

module.exports = env => {
  return {
    entry: [
      'babel-polyfill',
      'src/index.js'
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader:"babel-loader"
          }
        },
        {
          test: /\.css/,
          use: [
            "style-loader",
            "css-loader"
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.URL': JSON.stringify(env.URL)
      })
    ]
  }
}
