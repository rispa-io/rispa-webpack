import webpack from 'webpack'
import { createConfig } from '@webpack-blocks/webpack2'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const devServer = (app, webpackConfig) => {
  const config = createConfig(webpackConfig)
  const compiler = webpack(config)
  const middleware = webpackDevMiddleware(compiler, {
    quiet: false,
    noInfo: true,
    hot: true,
    publicPath: config.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
    serverSideRender: true,
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
}

export default devServer
