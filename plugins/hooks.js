const fastifyPlugin = require('fastify-plugin')

async function plugin(fastify) {
  const hooks = {
    authenticate: async(request, reply) => {
      try {
        await request.jwtVerify()
        const token = request.headers.authorization.replace('Bearer ', '')
        const RevokeToken = await fastify.db.RevokeToken.findOne({
          where: {
            token
          }
        })
        if (RevokeToken) {
          throw `blacklist token`
        }
      } catch (err) {
        reply.unauthorized()
      }
    },
    role_superadmin: async(request, reply) => {
      const token = request.headers.authorization.replace('Bearer ', '')
      const decoded = await fastify.jwt.decode(token)
      if (decoded && decoded.user.user_type == 'superadmin') {
        //
      } else {
        reply.unauthorized()
      }
    },
    role_admin: async(request, reply) => {
      const token = request.headers.authorization.replace('Bearer ', '')
      const decoded = await fastify.jwt.decode(token)
      if (decoded && (decoded.user.user_type == 'superadmin' || decoded.user.user_type == 'admin')) {
        //
      } else {
        reply.unauthorized()
      }
    },
  }
  fastify.decorate("hooks", hooks)
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(plugin)
