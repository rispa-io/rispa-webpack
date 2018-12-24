const { PluginApi } = require('@rispa/core')

class WebpackPluginApi extends PluginApi {
  static startHandler(context) {
    const instance = context.get(WebpackPluginApi.pluginName)

    return instance.runBuild()
  }

  runBuild() {
    return this.instance.runBuild()
  }

  addClientConfig(...configs) {
    this.instance.addClientConfig(...configs)
  }

  addCommonConfig(...configs) {
    this.instance.addCommonConfig(...configs)
  }

  getClientCompiler(otherConfigs) {
    return this.instance.getClientCompiler(otherConfigs)
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
}

WebpackPluginApi.pluginName = '@rispa/webpack'

module.exports = WebpackPluginApi
