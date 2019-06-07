exports.index = (fastify) => {
  return {
    options: {
      onRequest: [fastify.hooks.authenticate],
      schema: {
        summary: 'Send email contact to admin',
        description: '',
        tags: ['contact'],
        body: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
            }
          }
        }
      }
    },
    handler: async(request, reply) => {
      let mailOptions = {
        from: request.body.email,
        to: 'czbas23@gmail.com',
        subject: 'Fastify api contact',
        text: 'That was easy!',
        html: `<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>
            <p>Here's a nyan cat for you as an embedded attachment:<br/><img src="https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwNC84MTkvb3JpZ2luYWwvY3V0ZS1raXR0ZW4uanBn"/></p>`,
      }

      fastify.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw fastify.httpErrors.internalServerError(error)
        } else {
          reply.code(204).send()
        }
      })
    }
  }
}
