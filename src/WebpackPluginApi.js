const { PluginApi } = require('@rispa/core')

function addEntry(addConfig, name, paths) {
  if (!name || typeof name !== 'string') {
    throw new TypeError('Entry name must be non empty string')
  }

  if (paths.length === 0) {
    throw new TypeError('Entry path required')
  }

  addConfig((context, { merge }) => merge({
    entry: {
      [name]: paths,
    },
  }))
}

class WebpackPluginApi extends PluginApi {
  constructor(props) {
    super(props)
    this.addClientConfig = this.addClientConfig.bind(this)
    this.addServerConfig = this.addServerConfig.bind(this)
    this.addCommonConfig = this.addCommonConfig.bind(this)
  }
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

  addServerConfig(...configs) {
    this.instance.addServerConfig(...configs)
  }

  getCompiler(side) {
    return this.instance.getCompiler(side)
  }

  addClientEntry(name, ...paths) {
    addEntry(this.addClientConfig, name, paths)
  }

  addCommonEntry(name, ...paths) {
    addEntry(this.addCommonConfig, name, paths)
  }

  addServerEntry(name, ...paths) {
    addEntry(this.addServerConfig, name, paths)
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
