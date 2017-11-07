const path = require('path')
const { group, env } = require('@webpack-blocks/webpack2')

module.exports = config => group([
  context => ({
    context: path.resolve(config.outputPath, '..'),
    output: {
      path: config.outputPath,
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: config.publicPath,
    },
    plugins: [
      new context.webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
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
