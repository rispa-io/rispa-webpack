const WebpackPlugin = require('../src/WebpackPlugin')
const WebpackPluginApi = require('../src/WebpackPluginApi')

function init(context, config) {
  return new WebpackPlugin(context, config)
}

function api(instance) {
  return new WebpackPluginApi(instance)
}

module.exports = init

module.exports.api = api
