const path = require('path')
const { group, env } = require('@webpack-blocks/webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { StatsWriterPlugin } = require('webpack-stats-plugin')

module.exports = config => group([
  (context, { merge }) => merge({
    name: 'client',
    target: 'web',

    output: {
      path: path.resolve(config.outputPath, 'client'),
      publicPath: config.publicPath,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[hash].chunk.js',
    },

    plugins: [
      // Visualize size of webpack output files with an interactive zoomable treemap
      // https://github.com/webpack-contrib/webpack-bundle-analyzer
      process.env.ANALYZE_BUNDLE ? new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }) : null,

      // Plugin to clean your build folder before building
      // https://github.com/johnagan/clean-webpack-plugin
      new CleanWebpackPlugin(['client'], {
        root: config.outputPath,
        verbose: false,
      }),
    ].filter(Boolean),

    // Client optimizations with chunks
    optimization: {
      // Move runtime chunk in vendors
      runtimeChunk: {
        name: 'vendors',
      },
      splitChunks: {
        cacheGroups: {
          // Move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk).
          commons: {
            chunks: 'initial',
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            minChunks: 2,
          },
        },
      },
    },

    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    // https://webpack.js.org/configuration/node/
    // https://github.com/webpack/node-libs-browser/tree/master/mock
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  }),
  env('development', [
    (context, { merge }) => merge({
      mode: 'development',
      devtool: 'cheap-module-source-map',

      plugins: [
        new context.webpack.HotModuleReplacementPlugin(),
      ],
    }),
  ]),
  env('production', [
    (context, { merge }) => merge({
      mode: 'production',
      devtool: '',

      // Minimize bundle size
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                inline: true,
                passes: 2,
              },
              output: {
                beautify: false,
              },
              mangle: true,
            },
          }),
        ],
      },
      plugins: [
        // Write webpack stats for production server
        new StatsWriterPlugin({
          filename: 'stats.json',
          fields: ['assetsByChunkName'],
        }),
      ],
    }),
  ]),
])
