const fastifyPlugin = require('fastify-plugin')

async function plugin (fastify, options) {
  fastify.register(require('fastify-cors'), { 
    origin: ['https://cesstant.com'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: '*'
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(plugin)