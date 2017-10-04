class WebpackPluginApi {
  static startHandler(context) {
    const instance = context.get(WebpackPluginApi.pluginName)

    instance.runBuild()
  }
}

WebpackPluginApi.pluginName = '@rispa/webpack'

module.exports = WebpackPluginApi
