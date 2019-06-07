const fastifyPlugin = require('fastify-plugin')

async function plugin(fastify, options) {
  fastify.register(require('fastify-helmet'))
  fastify.register(require('fastify-formbody'))
  fastify.register(require('fastify-sensible'))
  fastify.register(require('fastify-routes'))
  fastify.register(require('./dotenv'))
  fastify.register(require('./cors'))
  fastify.register(require('./jwt'))
  fastify.register(require('./hooks'))
  fastify.register(require('./db-connector'))
  fastify.register(require('./nodemailer'))
  fastify.register(require('./fastify-file-upload'))
  fastify.register(require('./i18n'))
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(plugin)
