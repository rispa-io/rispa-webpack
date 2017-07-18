import path from 'path'
import { group, env } from '@webpack-blocks/webpack2'
import config from '@rispa/config'

export default group([
  context => ({
    context: path.resolve(__dirname, '..'),
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
