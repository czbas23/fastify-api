const fastifyPlugin = require('fastify-plugin')
const i18n = require("i18n");

i18n.configure({
  locales: ['en', 'th'],
  defaultLocale: 'en',
  cookie: 'locale',
  directory: __dirname + '/../locales',
  objectNotation: true
});

async function plugin(fastify, options) {
  // fastify.use(i18n.init)
  fastify.addHook('onRequest', (request, reply, next) => {
    i18n.setLocale(request.headers['accept-language'] || 'en')
    next()
  })
  fastify.addHook('preHandler', i18n.init)
  fastify.decorate('i18n', i18n)
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(plugin)
