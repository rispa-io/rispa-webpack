const { PluginInstance, createLogger } = require('@rispa/core')
const ConfigPluginApi = require('@rispa/config').default
const webpack = require('webpack')
const { createConfig } = require('@webpack-blocks/webpack')

const createDefaultClientWebpackConfig = require('./config/client.wpc')
const createDefaultCommonWebpackConfig = require('./config/common.wpc')
const createDefaultServerWebpackConfig = require('./config/server.wpc')

const logger = createLogger('@rispa/webpack')

function runCompiler(compiler) {
  logger.info('Compiling...')

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line complexity
    compiler.run((err, stats) => {
      if (err) {
        logger.error(err.stack || err)
        if (err.details) {
          logger.error(err.details)
        }

        reject(err)
      }

      const statsString = stats.toString({
        colors: true,
      })
      if (statsString) {
        logger.info(statsString)
      }

      if (stats.hasErrors()) {
        logger.error(logger.colors.red('Failed to compile.'))

        reject()
      } else if (stats.hasWarnings()) {
        logger.warn(logger.colors.yellow('Compiled with warnings.'))

        resolve()
      } else {
        logger.info(logger.colors.green('Compiled successfully.'))

        resolve()
      }
    })
  })
}

class WebpackPlugin extends PluginInstance {
  constructor(context) {
    super(context)

    this.config = context.get(ConfigPluginApi.pluginName).getConfig()

    this.clientConfig = []
    this.commonConfig = []
    this.serverConfig = []
  }

  start() {
    const defaultCommonWebpackConfig = createDefaultCommonWebpackConfig(this.config)

    this.addClientConfig(createDefaultClientWebpackConfig(this.config))
    this.addServerConfig(createDefaultServerWebpackConfig(this.config))
    this.addCommonConfig(defaultCommonWebpackConfig)
  }

  addClientConfig(...configs) {
    this.clientConfig = this.clientConfig.concat(configs)
  }

  addServerConfig(...configs) {
    this.serverConfig = this.serverConfig.concat(configs)
  }

  addCommonConfig(...configs) {
    this.commonConfig = this.commonConfig.concat(configs)
  }

  getClientCompiler(otherConfigs) {
    const config = this.getClientConfig(otherConfigs)

    return webpack(config)
  }

  getServerCompiler(otherConfigs) {
    const config = this.getServerConfig(otherConfigs)

    return webpack(config)
  }

  runBuild() {
    const compiler = process.env.TARGET_ENV === 'client' ? this.getClientCompiler() : this.getServerCompiler()

    return runCompiler(compiler)
  }

  getCommonConfig(otherConfigs = []) {
    const config = createConfig(this.commonConfig.concat(otherConfigs))

    return config
  }

  getClientConfig(otherConfigs = []) {
    const config = createConfig(this.commonConfig.concat(this.clientConfig, otherConfigs))

    return config
  }

  getServerConfig(otherConfigs = []) {
    const config = createConfig(this.commonConfig.concat(this.serverConfig, otherConfigs))

    return config
  }
}

module.exports = WebpackPlugin
