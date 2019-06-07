// Require the framework and instantiate it
global.__basedir = __dirname;
const fastify = require('fastify')({
  logger: true
})
const path = require('path')

require('dotenv').config()

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
})

fastify.register(require('./plugins'))
fastify.register(require('./routes'))

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) throw err
    // fastify.swagger()
    // console.log(fastify.routes)
    // console.log(path.join(__dirname, '/public'))
  fastify.log.info(`server listening on ${address}`)
})
