const path = require('path')
const { group, env } = require('@webpack-blocks/webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { StatsWriterPlugin } = require('webpack-stats-plugin')

module.exports = config => group([
  (context, { merge }) => merge({
    name: 'client',
    plugins: [
      process.env.ANALYZE_BUNDLE ? new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }) : null,
      new CleanWebpackPlugin([config.outputPath.split(path.sep).pop()], {
        exclude: ['plugins.json'],
        root: path.dirname(config.outputPath),
        verbose: false,
      }),
    ].filter(Boolean),
    stats: true,
  }),
  env('development', [
    (context, { merge }) => merge({
      devtool: 'cheap-module-source-map',
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
      plugins: [
        new StatsWriterPlugin({
          filename: 'stats.json',
          fields: ['assetsByChunkName'],
        }),
      ],
    }),
  ]),
])
