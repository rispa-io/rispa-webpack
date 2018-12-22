const { group } = require('@webpack-blocks/webpack')

module.exports = () => group([
  (context, { merge }) => merge({
    name: 'server',
  }),
])
