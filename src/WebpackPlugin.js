const { PluginInstance } = require('@rispa/core')
const ConfigPluginApi = require('@rispa/config').default
const webpack = require('webpack')
const { createConfig } = require('@webpack-blocks/webpack2')
const createDebug = require('debug')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const createDefaultClientWebpackConfig = require('./config/client.wpc')
const createDefaultCommonWebpackConfig = require('./config/common.wpc')

const log = createDebug('rispa:info:webpack')
const logError = createDebug('rispa:error:webpack')

const printErrors = (summary, errors) => {
  logError(summary)
  errors.forEach(err => {
    logError(err.message || err)
  })
}

class WebpackPlugin extends PluginInstance {
  constructor(context) {
    super(context)

    this.config = context.get(ConfigPluginApi.pluginName).getConfig()

    this.clientConfig = []
    this.commonConfig = []

    this.clientMiddleware = []
    this.commonMiddleware = []
  }

  start() {
    const defaultCommonWebpackConfig = createDefaultCommonWebpackConfig(this.config)

    this.addClientConfig(defaultCommonWebpackConfig, createDefaultClientWebpackConfig(this.config))
    this.addCommonConfig(defaultCommonWebpackConfig)
  }

  addClientConfig(...configs) {
    this.clientConfig = this.clientConfig.concat(configs)
  }

  addCommonConfig(...configs) {
    this.commonConfig = this.commonConfig.concat(configs)
  }

  devServer(app) {
    const config = this.getClientConfig()
    const compiler = webpack(config)
    const middleware = webpackDevMiddleware(compiler, {
      quiet: false,
      noInfo: true,
      hot: true,
      publicPath: config.output.publicPath,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      stats: {
        colors: true,
      },
    })

    app.use(middleware)
    app.use(webpackHotMiddleware(compiler))
  }

  runBuild() {
    const config = this.getClientConfig()

    return new Promise((resolve, reject) => {
      webpack(config).run((err, stats) => {
        if (err) {
          printErrors('Failed to compile.', [err])
          reject()
        } else if (stats.compilation.errors.length) {
          printErrors('Failed to compile.', stats.compilation.errors)
          reject()
        } else {
          log('Compiled successfully.')

          resolve(this.context)
        }
      })
    })
  }

  getCommonConfig() {
    const config = createConfig(this.commonConfig)
    if (this.commonMiddleware.length === 0) {
      return config
    }

    return this.commonMiddleware.reduce((result, middleware) => middleware(result), config)
  }

  getClientConfig() {
    const config = createConfig(this.commonConfig.concat(this.clientConfig))
    if (this.clientMiddleware.length === 0) {
      return config
    }

    return this.clientMiddleware.reduce((result, middleware) => middleware(result), config)
  }

  addClientMiddleware(middleware) {
    this.clientMiddleware.push(middleware)
  }

  addCommonMiddleware(middleware) {
    this.commonMiddleware.push(middleware)
  }
}

module.exports = WebpackPlugin
