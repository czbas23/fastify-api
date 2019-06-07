const fastifyPlugin = require('fastify-plugin')

async function plugin(fastify, options) {
  fastify.register(require("fastify-jwt"), {
    secret: fastify.config.APP_KEY
  })

  const getToken = (request) => {
    return request.headers.authorization.replace('Bearer ', '')
  }

  const getTokenData = async(request) => {
    const token = getToken(request)
    const decoded = await fastify.jwt.decode(token)
    return decoded
  }

  fastify.decorate('getToken', getToken)
  fastify.decorate('getTokenData', getTokenData)
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(plugin)
