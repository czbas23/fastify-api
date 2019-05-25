async function routes (fastify, options) {

  fastify.get('/', (request, reply) => {
    const pkg = require('../package')
    reply.send({
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      author: pkg.author
    })
  })

  fastify.register((fastify, options, next) => {
    fastify.register(require('../plugins/swagger'), {
      version: 'v1',
      registerRoute: () => {
        fastify.register(require('./v1'))
      },
      tags: [
        { name: 'auth', description: 'Auth related end-points' },
        { name: 'contact', description: 'Contact related end-points' }
      ]
    })
    next()
  }, { prefix: '/v1' })

}

module.exports = routes