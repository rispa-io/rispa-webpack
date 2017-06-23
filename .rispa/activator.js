import { init, start, build } from '@rispa/core/events'
import { server } from '@rispa/server/events'
import runBuild from '../src/build'
import getBabelOptions from './babel-options'
import webpackExtensionCommon from './common.wpc'
import webpackExtensionClient from './client.wpc'

const activator = on => {
  const initHandler = registry => {
    const webpackCommon = webpackExtensionCommon(registry)
    registry.add('webpack.common', webpackCommon)
    registry.add('webpack.client', webpackCommon, webpackExtensionClient)
    registry.add('babel', getBabelOptions)
  }

  on(init(build), initHandler)
  on(init(server), initHandler)

  on(start(build), registry => {
    runBuild(registry.get('webpack.client'))
  })
}

export default activator
