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

  addServerConfig(...configs) {
    this.instance.addServerConfig(...configs)
  }

  addCommonConfig(...configs) {
    this.instance.addCommonConfig(...configs)
  }

  getClientCompiler(otherConfigs) {
    return this.instance.getClientCompiler(otherConfigs)
  }

  getServerCompiler(otherConfigs) {
    return this.instance.getServerCompiler(otherConfigs)
  }

  getCommonConfig(...otherConfigs) {
    return this.instance.getCommonConfig(otherConfigs)
  }

  getClientConfig(...otherConfigs) {
    return this.instance.getClientConfig(otherConfigs)
  }

  getServerConfig(...otherConfigs) {
    return this.instance.getServerConfig(otherConfigs)
  }
}

WebpackPluginApi.pluginName = '@rispa/webpack'

module.exports = WebpackPluginApi
