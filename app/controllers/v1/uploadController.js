exports.index = (fastify) => {
  return {
    options: {
      onRequest: [fastify.hooks.authenticate],
      schema: {
        description: '',
        tags: ['upload'],
        summary: 'Get all upload',
      }
    },
    handler: async(request, reply) => {
      const uploads = await fastify.db.Upload.findAll()
      return reply.send(uploads)
    }
  }
}

exports.store = (fastify) => {
  return {
    options: {
      onRequest: [fastify.hooks.authenticate],
      schema: {
        description: '',
        tags: ['upload'],
        summary: 'Upload file'
      }
    },
    handler: async(request, reply) => {
      const files = request.raw.files
        //   console.log(files)
        //   let fileArr = []
        //   for (let key in files) {
        //     fileArr.push({
        //       name: files[key].name,
        //       mimetype: files[key].mimetype
        //     })
        //   }
      reply.send(files)
    }
  }
}

exports.show = (fastify) => {
  return {
    options: {
      onRequest: [fastify.hooks.authenticate],
      schema: {
        description: '',
        tags: ['upload'],
        summary: 'Update upload',
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: {
              type: 'string',
              description: 'upload id'
            }
          }
        }
      }
    },
    handler: async(request, reply) => {
      const upload = await fastify.db.Blog.findByPk(request.params.id)
      if (upload) {
        return reply.send(upload)
      }
      return reply.notFound()
    }
  }
}

exports.update = (fastify) => {
  return {
    options: {
      onRequest: [fastify.hooks.authenticate],
      schema: {
        description: '',
        tags: ['upload'],
        summary: 'Update upload',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'upload id'
            }
          }
        },
        body: {
          type: 'object',
          required: ['subject', 'description', 'content'],
          properties: {
            subject: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            content: {
              type: 'string'
            }
          }
        }
      }
    },
    handler: async(request, reply) => {
      let dataSave = {
        subject: request.body.subject,
        description: request.body.description,
        content: request.body.content,
        updatedAt: new Date()
      }
      const updateBlog = await fastify.db.Blog.update(dataSave, {
        where: {
          id: request.params.id
        }
      });
      if (updateBlog == 0) {
        return reply.notFound()
      }
      return reply.code(204).send()
    }
  }
}

exports.destroy = (fastify) => {
  return {
    options: {
      onRequest: [fastify.hooks.authenticate],
      schema: {
        description: '',
        tags: ['upload'],
        summary: 'Update upload',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'upload id'
            }
          }
        }
      }
    },
    handler: async(request, reply) => {
      const uploadDestroy = await fastify.db.Blog.destroy({
        where: {
          id: request.params.id
        }
      })
      if (uploadDestroy == 0) {
        return reply.notFound()
      }
      return reply.code(204).send()
    }
  }
}
