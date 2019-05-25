const fastifyPlugin = require('fastify-plugin')

async function plugin (fastify, options, next) {
  const db = require('../models')
  fastify.decorate('db', db)
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(plugin)