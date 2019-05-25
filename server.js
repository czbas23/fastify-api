// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})
require('dotenv').config()

fastify.register(require('./plugins'))
fastify.register(require('./routes'))

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) throw err
    // fastify.swagger()
    // console.log(fastify.routes)
  fastify.log.info(`server listening on ${address}`)
})