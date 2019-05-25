const fastifyPlugin = require('fastify-plugin')
const fastifyEnv = require('fastify-env')

const schema = {
  type: 'object',
  required: [
    'APP_KEY',
    'APP_URL',
    'HTTPS',
    'DB_CONNECTION',
    'DB_HOST',
    'DB_DATABASE',
    'DB_USERNAME',
    'DB_PASSWORD',
    'MAIL_HOST',
    'MAIL_PORT',
    'MAIL_USERNAME',
    'MAIL_PASSWORD',
  ],
  properties: {
    APP_KEY: {
      type: 'string',
    },
    APP_URL: {
      type: 'string',
      default: 'http://localhost:3000'
    },
    HTTPS: {
      type: 'string',
      default: 0
    },
    DB_CONNECTION: {
      type: 'string',
      default: 'mysql'
    },
    DB_HOST: {
      type: 'string',
      default: '127.0.0.1'
    },
    DB_DATABASE: {
      type: 'string',
    },
    DB_USERNAME: {
      type: 'string',
    },
    DB_PASSWORD: {
      type: 'string',
    },
    MAIL_HOST: {
      type: 'string',
    },
    MAIL_PORT: {
      type: 'string',
    },
    MAIL_USERNAME: {
      type: 'string',
    },
    MAIL_PASSWORD: {
      type: 'string',
    },
  }
}

async function plugin (fastify, options) {
  fastify.register(fastifyEnv, {
    confKey: 'config', // optional, default: 'config'
    schema: schema,
    dotenv: true
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(plugin)