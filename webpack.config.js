const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


const uglifyJavascript = new UglifyJSPlugin({
  uglifyOptions:
    process.env.NODE_ENV == 'production'
      ? {
          compress: true,
          mangle: true,
          warnings: false
        }
      : {
          compress: false,
          mangle: false,
          warnings: true,
          sourceMap: true
        }
})

const config = {
  entry: './scripts/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'scripts')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules(?!\/webpack-dev-server)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [uglifyJavascript]
}

module.exports = config
