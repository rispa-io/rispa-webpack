import { init, start, build } from '@rispa/core/events'
import { server } from '@rispa/server/events'
import runBuild from '../src/build'
import devServer from '../src/dev-server'
import webpackExtensionCommon from './common.wpc'
import webpackExtensionClient from './client.wpc'

const activator = on => {
  const initHandler = registry => {
    registry.add('webpack.common', webpackExtensionCommon)
    registry.add('webpack.client', webpackExtensionCommon, webpackExtensionClient)
    registry.set('devServer', devServer)
  }

  on(init(build), initHandler)
  on(init(server), initHandler)

  on(start(build), registry => {
    runBuild(registry.get('webpack.client'))
  })
}

export default activator
