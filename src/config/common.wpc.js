const path = require('path')
const { group, env, defineConstants } = require('@webpack-blocks/webpack')

module.exports = config => group([
  (context, { merge }) => merge({
    context: path.resolve(config.outputPath, '..'),
    output: {
      path: config.outputPath,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[hash].js',
      publicPath: config.publicPath,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    stats: {
      children: true,
      chunks: true,
      modules: true,
      reasons: true,
    },
  }),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV,
  }),
  env('production', [
    (context, { merge }) => merge({
      mode: 'production',
    }),
  ]),
  env('development', [
    (context, { merge }) => merge({
      mode: 'development',
    }),
  ]),
])
