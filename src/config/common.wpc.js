const path = require('path')
const { group, env, defineConstants } = require('@webpack-blocks/webpack2')

module.exports = config => group([
  () => ({
    context: path.resolve(config.outputPath, '..'),
    output: {
      path: config.outputPath,
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: config.publicPath,
    },
    plugins: [],
  }),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV,
  }),
  env('production', [
    context => ({
      plugins: [
        new context.webpack.HashedModuleIdsPlugin(),
      ],
    }),
  ]),
  env('development', [
    context => ({
      plugins: [
        new context.webpack.NamedModulesPlugin(),
      ],
    }),
  ]),
])
