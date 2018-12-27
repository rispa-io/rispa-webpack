const path = require('path')
const { group, env } = require('@webpack-blocks/webpack')

module.exports = config => group([
  (context, { merge }) => merge({
    context: config.context,

    resolve: {
      // Add other extensions
      extensions: ['.jsx'],
    },

    // Override default performance hints
    performance: {
      maxEntrypointSize: 650000,
      maxAssetSize: 550000,
    },
  }),
])
