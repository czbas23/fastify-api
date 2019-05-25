const fastifyPlugin = require('fastify-plugin')

async function plugin(fastify, options) {
  fastify.register(require("fastify-jwt"), {
    secret: fastify.config.APP_KEY
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(plugin)