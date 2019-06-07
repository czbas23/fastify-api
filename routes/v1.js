module.exports = function (fastify, options, next) {
  fastify.register(require('../plugins/swagger'), {
    version: 'v1',
    registerRoute: () => {
      const {
        authController,
        userController,
        contactController,
        blogController,
        uploadController
      } = require('../app/controllers/v1')

      fastify.post('/login', authController.login(fastify).options, authController.login(fastify).handler)
      fastify.post('/signup', authController.signup(fastify).options, authController.signup(fastify).handler)
      fastify.post('/logout', authController.logout(fastify).options, authController.logout(fastify).handler)

      fastify.get('/user', userController.index(fastify).options, userController.index(fastify).handler)

      fastify.post('/contact', contactController.index(fastify).options, contactController.index(fastify).handler)

      fastify.get('/blog', blogController.index(fastify).options, blogController.index(fastify).handler)
      fastify.post('/blog', blogController.store(fastify).options, blogController.store(fastify).handler)
      fastify.get('/blog/:id', blogController.show(fastify).options, blogController.show(fastify).handler)
      fastify.put('/blog/:id', blogController.update(fastify).options, blogController.update(fastify).handler)
      fastify.delete('/blog/:id', blogController.destroy(fastify).options, blogController.destroy(fastify).handler)

      fastify.get('/upload', uploadController.index(fastify).options, uploadController.index(fastify).handler)
      fastify.post('/upload', uploadController.store(fastify).options, uploadController.store(fastify).handler)
      fastify.get('/upload/:id', uploadController.show(fastify).options, uploadController.show(fastify).handler)
      fastify.put('/upload/:id', uploadController.update(fastify).options, uploadController.update(fastify).handler)
      fastify.delete('/upload/:id', uploadController.destroy(fastify).options, uploadController.destroy(fastify).handler)

    },
    tags: [
      { name: 'auth', description: 'Auth related end-points' },
      { name: 'user', description: 'User related end-points' },
      { name: 'contact', description: 'Contact related end-points' },
      { name: 'blog', description: 'Blog related end-points' },
      { name: 'upload', description: 'Upload related end-points' }
    ]
  })

  next()
}
