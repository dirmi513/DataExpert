module.exports = () => {
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
    }
  }
}
