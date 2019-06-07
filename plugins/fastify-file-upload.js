const fastifyPlugin = require('fastify-plugin')

async function plugin(fastify, options) {
  fastify.register(require("fastify-file-upload"), {
    limits: { fileSize: 50 * 1024 * 1024 },
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(plugin)
