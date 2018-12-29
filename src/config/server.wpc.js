const path = require('path')
const { group, env } = require('@webpack-blocks/webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = config => group([
  (context, { merge }) => merge({
    name: 'server',
    target: 'node',

    output: {
      path: path.resolve(config.outputPath, 'server'),
      filename: 'index.js',
      libraryTarget: 'commonjs2',
    },

    externals: [nodeExternals({
      whitelist: [/@rispa/],
    })],

    devtool: 'cheap-module-source-map',
  }),

  env('development', [
    (context, { merge }) => merge({
      mode: 'development',
    }),
  ]),
  env('production', [
    (context, { merge }) => merge({
      mode: 'production',
    }),
  ]),
])
