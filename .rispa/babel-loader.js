import getBabelrcConfig from '@rispa/core/babel'

const getBabelLoader = () => {
  const babelrcConfig = getBabelrcConfig()

  // add react-hot-loader/babel to babel plugins
  if (process.env.NODE_ENV === 'development') {
    const hotLoaderPlugin = require.resolve('react-hot-loader/babel')
    babelrcConfig.plugins.push(hotLoaderPlugin)
  }

  const babelLoader = require.resolve('babel-loader')

  return {
    test: /\.js[x]?$/,
    exclude: /node_modules/,
    loader: babelLoader,
    options: babelrcConfig,
  }
}

export default getBabelLoader
