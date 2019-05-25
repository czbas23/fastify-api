module.exports = function(fastify, opts, next) {

  const { authController, userController, contactController } = require('../controllers/v1')

  fastify.post('/login', authController.login(fastify).options, authController.login(fastify).handler)
  fastify.post('/signup', authController.signup(fastify).options, authController.signup(fastify).handler)
  fastify.post('/logout', authController.logout(fastify).options, authController.logout(fastify).handler)

  fastify.get('/user', userController.index(fastify).options, userController.index(fastify).handler)

  fastify.post('/contact', contactController.index(fastify).options, contactController.index(fastify).handler)

  next()
}