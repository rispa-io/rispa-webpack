class WebpackPluginApi {
  static startHandler(context) {
    const instance = context.get(WebpackPluginApi.name)

    instance.build()
  }
}

WebpackPluginApi.name = '@rispa/webpack'

module.exports = WebpackPluginApi
