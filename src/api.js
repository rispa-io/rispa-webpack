const WebpackPluginApi = {
  pluginName: '@rispa/webpack',

  startHandler(context) {
    const instance = context.get(WebpackPluginApi.pluginName)

    return instance.runBuild()
  },
}

module.exports = WebpackPluginApi
