const fastifyPlugin = require('fastify-plugin')

async function plugin(fastify, options) {
  const nodemailer = require('nodemailer')
  let transporter = nodemailer.createTransport({
    host: fastify.config.MAIL_HOST,
    port: fastify.config.MAIL_PORT,
    secure: fastify.config.MAIL_PORT == 465,
    auth: {
      user: fastify.config.MAIL_USERNAME,
      pass: fastify.config.MAIL_PASSWORD
    }
  });
  fastify.decorate('transporter', transporter)
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(plugin)