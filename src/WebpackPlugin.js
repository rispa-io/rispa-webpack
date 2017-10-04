const { PluginInstance } = require('@rispa/core')
const webpack = require('webpack')
const { createConfig } = require('@webpack-blocks/webpack2')
const createDebug = require('debug')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const clientWebpackConfig = require('./config/client.wpc')
const commonWebpackConfig = require('./config/common.wpc')

const log = createDebug('rispa:info:webpack')
const logError = createDebug('rispa:error:webpack')

const printErrors = (summary, errors) => {
  logError(summary)
  errors.forEach(err => {
    logError(err.message || err)
  })
}

class WebpackPlugin extends PluginInstance {
  constructor(context, config) {
    super(context, config)

    this.clientConfig = []
    this.commonConfig = []
  }

  start() {
    this.addClientConfig(commonWebpackConfig, clientWebpackConfig)
    this.addCommonConfig(commonWebpackConfig)
  }

  addClientConfig(...configs) {
    this.clientConfig = this.clientConfig.concat(configs)
  }

  addCommonConfig(...configs) {
    this.commonConfig = this.commonConfig.concat(configs)
  }

  devServer(app) {
    const config = createConfig(this.clientConfig)
    const compiler = webpack(config)
    const middleware = webpackDevMiddleware(compiler, {
      quiet: false,
      noInfo: true,
      hot: true,
      publicPath: config.output.publicPath,
      headers: { 'Access-Control-Allow-Origin': '*' },
      stats: { colors: true },
    })

    app.use(middleware)
    app.use(webpackHotMiddleware(compiler))
  }

  build() {
    const config = createConfig(this.clientConfig)

    webpack(config).run((err, stats) => {
      if (err) {
        printErrors('Failed to compile.', [err])
        process.exit(1)
      }

      if (stats.compilation.errors.length) {
        printErrors('Failed to compile.', stats.compilation.errors)
        process.exit(1)
      }

      log('Compiled successfully.')
    })
  }
}

module.exports = WebpackPlugin
