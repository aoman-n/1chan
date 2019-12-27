const path = require("path")
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  target: 'serverless',
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/_next/static/',
          outputPath: 'static/',
          name: '[name].[ext]'
        }
      }
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve(__dirname, "./src")
    };

    return config
  }
})
