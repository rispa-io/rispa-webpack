const WebpackPlugin = require('../src/WebpackPlugin')

function init(context, config) {
  return new WebpackPlugin(context, config)
}

module.exports = init

module.exports.api = require('../src/api')
