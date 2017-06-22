import path from 'path'
import config from '@rispa/config'
import getBabelLoader from './babel-loader'

export default registry => context => ({
  context: path.resolve(__dirname, '..'),
  output: {
    path: config.outputPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: config.publicPath,
  },
  module: {
    rules: [
      getBabelLoader(registry),
    ],
  },
  plugins: [
    new context.webpack.NamedModulesPlugin(),
    new context.webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
})
