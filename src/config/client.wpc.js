const path = require('path')
const { group, env } = require('@webpack-blocks/webpack2')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = config => group([
  context => ({
    plugins: [
      new CleanWebpackPlugin([config.outputPath.split(path.sep).pop()], {
        exclude: ['plugins.json'],
        root: path.dirname(config.outputPath),
      }),
      new context.webpack.optimize.CommonsChunkPlugin({
        names: ['bootstrap'],
        filename: '[name]-[hash].js',
        minChunks: Infinity,
      }),
    ],
  }),
  env('development', [
    context => ({
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
    context => ({
      devtool: false,
      plugins: [
        new context.webpack.LoaderOptionsPlugin({
          minimize: true,
        }),
        new context.webpack.optimize.UglifyJsPlugin({
          comments() {
            return false
          },
          sourceMap: false,
          minimize: true,
          compress: {
            warnings: false,
          },
          mangle: true,
          beautify: false,
          evaluate: false,
        }),
      ],
    }),
  ]),
])
