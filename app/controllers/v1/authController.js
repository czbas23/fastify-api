const bcrypt = require('bcrypt')

exports.login = (fastify) => {
  return {
    options: {
      schema: {
        summary: 'Login',
        description: '',
        tags: ['auth'],
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email'
            },
            password: {
              type: 'string',
              minLength: 8
            }
          }
        }
      }
    },
    handler: async(request, reply) => {
      const user = await fastify.db.User.findOne({
        where: {
          email: request.body.email
        }
      })
      if (!user) {
        throw fastify.httpErrors.unauthorized()
      }
      const match = await bcrypt.compare(request.body.password, user.password);
      if (!match) {
        throw fastify.httpErrors.unauthorized()
      }
      const token = fastify.jwt.sign({
        user: {
          id: user.id,
          email: user.email,
          user_type: user.user_type,
        },
      }, { expiresIn: '30d' })
      reply.send({ token })
    }
  }
}

exports.signup = (fastify) => {
  return {
    options: {
      onRequest: [fastify.hooks.authenticate, fastify.hooks.role_admin],
      schema: {
        summary: 'Signup',
        description: '',
        tags: ['auth'],
        body: {
          type: 'object',
          required: ['email', 'password', 'name'],
          properties: {
            email: {
              type: 'string',
              format: 'email'
            },
            password: {
              type: 'string',
              minLength: 8
            },
            name: {
              type: 'string',
            },
          }
        }
      }
    },
    handler: async(request, reply) => {
      const findUser = await fastify.db.User.findOne({
        where: {
          email: request.body.email
        }
      })
      if (findUser) {
        throw fastify.httpErrors.badRequest(`The email has already been taken`)
      }
      let dataSave = {
        email: request.body.email,
        name: request.body.name,
      }
      dataSave.password = await new Promise(resolve => {
        bcrypt.hash(request.body.password, 10, function (err, hash) {
          resolve(hash)
        });
      })
      let user = await fastify.db.User.create(dataSave)
      reply.code(201).send(user)
    }
  }
}

exports.logout = (fastify) => {
  return {
    options: {
      onRequest: [fastify.hooks.authenticate],
      schema: {
        summary: 'Logout',
        description: '',
        tags: ['auth'],
      }
    },
    handler: async(request, reply) => {
      let token = request.headers.authorization.replace('Bearer ', '')
      await fastify.db.RevokeToken.create({
        token
      })
      reply.code(204).send()
    }
  }
}
