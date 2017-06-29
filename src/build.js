import webpack from 'webpack'
import { createConfig } from '@webpack-blocks/webpack2'
import createDebug from 'debug'

const log = createDebug('rispa:info:webpack')
const logError = createDebug('rispa:error:webpack')

const printErrors = (summary, errors) => {
  logError(summary)
  errors.forEach(err => {
    logError(err.message || err)
  })
}

const build = webpackConfig => {
  const config = createConfig(webpackConfig)

  webpack(config).run((err, stats) => {
    if (err) {
      printErrors('Failed to compile.', [err])
      process.exit(1)
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors)
      process.exit(1)
    }

    log('Compiled successfully.')
  })
}

export default build
