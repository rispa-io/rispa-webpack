const path = require('path')
const { group, env } = require('@webpack-blocks/webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeExternals = require('../utils/nodeExternals')

module.exports = config => group([
  (context, { merge }) => merge({
    name: 'server',
    target: 'node',

    output: {
      path: path.resolve(config.outputPath, 'server'),

      // For easy import like `require(outputPath)`
      filename: 'index.js',

      // Output entry point will be counted as a module
      // https://webpack.js.org/configuration/output/#output-librarytarget
      libraryTarget: 'commonjs2',
    },

    plugins: [
      // Plugin to clean your build folder before building
      // https://github.com/johnagan/clean-webpack-plugin
      new CleanWebpackPlugin(['server'], {
        root: config.outputPath,
        verbose: false,
      }),
    ].filter(Boolean),

    externals: [
      // We don't want to bundle `node_modules` dependencies.
      // Creates an externals function that ignores node_modules when bundling.
      nodeExternals({
        modulesDir: path.resolve(config.context, 'node_modules'),
      }),
    ],

    // Disable mocks
    node: {
      global: false,
      console: false,
      __dirname: false,
      __filename: false,
    },

    devtool: 'source-map',

    // Disable split chunks (no need for server)
    optimization: {
      splitChunks: false,
    },
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
