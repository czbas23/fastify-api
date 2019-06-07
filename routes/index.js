async function routes(fastify, options) {

  fastify.get('/', (request, reply) => {
    const pkg = require('../package')
    reply.send({
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      author: pkg.author
    })
  })

  fastify.register(require('./v1'), { prefix: '/v1' })

}

module.exports = routes
