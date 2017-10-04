const { init } = require('@rispa/core')

init(context => {
  context.get('@rispa/webpack').build()
})
