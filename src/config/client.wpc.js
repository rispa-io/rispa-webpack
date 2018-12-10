const path = require('path')
const { group, env } = require('@webpack-blocks/webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = config => group([
  (context, { merge }) => merge({
    plugins: [
      new CleanWebpackPlugin([config.outputPath.split(path.sep).pop()], {
        exclude: ['plugins.json'],
        root: path.dirname(config.outputPath),
      }),
    ],
    stats: true,
  }),
  env('development', [
    (context, { merge }) => merge({
      devtool: 'cheap-module-source-map',
      entry: {
        vendor: [
          require.resolve('webpack-hot-middleware/client'),
        ],
      },
      plugins: [
        new context.webpack.HotModuleReplacementPlugin(),
      ],
    }),
  ]),
  env('production', [
    (context, { merge }) => merge({
      optimization: {
        minimizer: [new UglifyJsPlugin()],
      },
    }),
  ]),
])
