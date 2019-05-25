const fastifyPlugin = require('fastify-plugin')

async function plugin(fastify, options) {
  const redis = require("redis")
  const redis_client = redis.createClient()
  fastify.decorate('redis_client', redis_client)
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(plugin)