function nodeExternals(options = {}) {
  const {
    modulesDir = 'node_modules',
    importType = 'commonjs',
  } = options
  let entry = true

  return (ctx, req, cb) => {
    // Include entry point
    if (entry) { // first module - entry point
      entry = false

      return cb()
    }

    // Resolve real module path by ctx
    const module = require.resolve(req, { paths: [ctx] })

    if (module.indexOf(modulesDir) !== -1) {
      // Mark this module as external
      // https://webpack.js.org/configuration/externals/
      return cb(null, `${importType} ${req}`)
    }

    return cb()
  }
}

module.exports = nodeExternals
