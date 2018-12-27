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

  getCommonConfig(...otherConfigs) {
    return this.instance.getCommonConfig(otherConfigs)
  }

  getClientConfig(...otherConfigs) {
    return this.instance.getClientConfig(otherConfigs)
  }
}

WebpackPluginApi.pluginName = '@rispa/webpack'

module.exports = WebpackPluginApi
