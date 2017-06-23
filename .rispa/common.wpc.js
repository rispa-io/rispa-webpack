import path from 'path'
import config from '@rispa/config'

export default context => ({
  context: path.resolve(__dirname, '..'),
  output: {
    path: config.outputPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: config.publicPath,
  },
  plugins: [
    new context.webpack.NamedModulesPlugin(),
    new context.webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
})
