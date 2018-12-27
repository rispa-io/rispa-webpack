const path = require('path')
const { group } = require('@webpack-blocks/webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = config => group([
  (context, { merge }) => merge({
    name: 'server',
    target: 'node',

    output: {
      path: path.resolve(config.outputPath, 'server'),
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[hash].chunk.js',
    },

    externals: [nodeExternals()],
  }),
])
