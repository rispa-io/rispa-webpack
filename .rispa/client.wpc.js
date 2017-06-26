import path from 'path'
import { createConfig, env } from '@webpack-blocks/webpack2'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import config from '@rispa/config'

export default () => createConfig([
  context => ({
    plugins: [
      new CleanWebpackPlugin([config.outputPath.split(path.sep).pop()], {
        exclude: ['activators.json'],
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
      entry: [require.resolve('webpack-hot-middleware/client')],
      plugins: [
        new context.webpack.HotModuleReplacementPlugin(),
      ],
    }),
  ]),
  env('production', [
    context => ({
      plugins: [
        new context.webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
        }),
      ],
    }),
  ]),
])
