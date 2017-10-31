const ConfigPluginApi = require('@rispa/config').default
const WebpackPlugin = require('./WebpackPlugin')
const WebpackPluginApi = require('./WebpackPluginApi')

module.exports.default = WebpackPlugin

module.exports.api = WebpackPluginApi

module.exports.after = [
  ConfigPluginApi.pluginName,
]
