const fastifyPlugin = require('fastify-plugin')

async function plugin (fastify, options) {
  fastify.register(require('fastify-swagger'), {
    routePrefix: 'doc',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Fastify API Document',
        description: '',
        version: options.version
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: fastify.config.APP_URL,
      schemes: [(!!fastify.config.HTTPS ? 'https' : 'http')],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: options.tags,
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    }
  })
  options.registerRoute()
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(plugin)