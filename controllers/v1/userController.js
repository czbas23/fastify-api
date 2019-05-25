const bcrypt = require('bcrypt')

exports.index = (fastify) => {
  return {
    options: {
      onRequest: [fastify.hooks.authenticate, fastify.hooks.role_admin],
      schema: {
        description: '',
        tags: ['user'],
        summary: 'Get all users',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'user id'
            }
          }
        },
      }
    },
    handler: async(request, reply) => {
      const users = await fastify.db.User.findAll()
      reply.send(users)
    }
  }
}