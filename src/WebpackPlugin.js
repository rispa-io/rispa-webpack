const { PluginInstance } = require('@rispa/core')
const ConfigPluginApi = require('@rispa/config').default
const webpack = require('webpack')
const { createConfig } = require('@webpack-blocks/webpack')
const createDebug = require('debug')
const createDefaultClientWebpackConfig = require('./config/client.wpc')
const createDefaultServerWebpackConfig = require('./config/server.wpc')
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
    this.serverConfig = []
    this.commonConfig = []

    this.clientMiddleware = []
    this.serverMiddleware = []
    this.commonMiddleware = []

    this.getCompiler = this.getCompiler.bind(this)
  }

  start() {
    const defaultCommonWebpackConfig = createDefaultCommonWebpackConfig(this.config)

    this.addClientConfig(defaultCommonWebpackConfig, createDefaultClientWebpackConfig(this.config))
    this.addServerConfig(defaultCommonWebpackConfig, createDefaultServerWebpackConfig(this.config))
    this.addCommonConfig(defaultCommonWebpackConfig)
  }

  addClientConfig(...configs) {
    this.clientConfig = this.clientConfig.concat(configs)
  }

  addCommonConfig(...configs) {
    this.commonConfig = this.commonConfig.concat(configs)
  }

  addServerConfig(...configs) {
    this.serverConfig = this.serverConfig.concat(configs)
  }

  getCompiler(side) {
    const config = side === 'client' ? this.getClientConfig() : this.serverConfig()
    return webpack(config)
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

  getCommonConfig(otherConfigs = []) {
    const config = createConfig(this.commonConfig.concat(otherConfigs))
    if (this.commonMiddleware.length === 0) {
      return config
    }

    return this.commonMiddleware.reduce((result, middleware) => middleware(result), config)
  }

  getClientConfig(otherConfigs = []) {
    return this.getConfig(this.clientConfig, this.clientMiddleware, otherConfigs)
  }

  getServerConfig(otherConfigs = []) {
    return this.getConfig(this.serverConfig, this.serverMiddleware, otherConfigs)
  }

  getConfig(config, middlewares, otherConfigs = []) {
    const webpackConfig = createConfig(this.commonConfig.concat(config, otherConfigs))
    if (middlewares.length === 0) {
      return webpackConfig
    }

    return middlewares.reduce((result, middleware) => middleware(result), webpackConfig)
  }

  addClientMiddleware(middleware) {
    this.clientMiddleware.push(middleware)
  }

  addCommonMiddleware(middleware) {
    this.commonMiddleware.push(middleware)
  }

  addServerMiddleware(middleware) {
    this.serverMiddleware.push(middleware)
  }
}

module.exports = WebpackPlugin
