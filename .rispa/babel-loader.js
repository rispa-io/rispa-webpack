import { createConfig } from '@webpack-blocks/webpack2'

const getBabelLoader = registry => {
  const babelConfig = createConfig.vanilla(registry.get('babel'))
  delete babelConfig.module

  return {
    test: /\.js[x]?$/,
    exclude: /node_modules/,
    loader: require.resolve('babel-loader'),
    options: babelConfig,
  }
}

export default getBabelLoader
