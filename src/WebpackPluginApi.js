const { PluginApi } = require('@rispa/core')

class WebpackPluginApi extends PluginApi {
  static startHandler(context) {
    const instance = context.get(WebpackPluginApi.pluginName)

    return instance.runBuild()
  }

  runBuild() {
    return this.instance.runBuild()
  }

  devServer(app) {
    this.instance.devServer(app)
  }

  addClientConfig(...configs) {
    this.instance.addClientConfig(...configs)
  }

  addCommonConfig(...configs) {
    this.instance.addCommonConfig(...configs)
  }

  getCompiler(side) {
    return this.instance.getCompiler(side)
  }

  addClientEntry(name, ...paths) {
    if (!name || typeof name !== 'string') {
      throw new TypeError('Entry name must be non empty string')
    }

    if (paths.length === 0) {
      throw new TypeError('Entry path required')
    }

    this.addClientConfig((context, { merge }) => merge({
      entry: {
        [name]: paths,
      },
    }))
  }

  addCommonEntry(name, ...paths) {
    if (!name || typeof name !== 'string') {
      throw new TypeError('Entry name must be non empty string')
    }

    if (paths.length === 0) {
      throw new TypeError('Entry path required')
    }

    this.addCommonConfig((context, { merge }) => merge({
      entry: {
        [name]: paths,
      },
    }))
  }

  getCommonConfig(...otherConfigs) {
    return this.instance.getCommonConfig(otherConfigs)
  }

  getClientConfig(...otherConfigs) {
    return this.instance.getClientConfig(otherConfigs)
  }

  addClientMiddleware(middleware) {
    this.instance.addClientMiddleware(middleware)
  }

  addCommonMiddleware(middleware) {
    this.instance.addCommonMiddleware(middleware)
  }
}

WebpackPluginApi.pluginName = '@rispa/webpack'

module.exports = WebpackPluginApi
