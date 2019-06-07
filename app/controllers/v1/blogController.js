const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)
const mkdirAsync = promisify(fs.mkdir)
const uuidv4 = require('uuid/v4');

exports.index = (fastify) => {
  return {
    options: {
      onRequest: [fastify.hooks.authenticate],
      schema: {
        description: '',
        tags: ['blog'],
        summary: 'Get all blog',
      }
    },
    handler: async(request, reply) => {
      try {
        const blogs = await fastify.db.Blog.findAll({
          include: [
            {
              model: fastify.db.BlogSite
            },
            {
              model: fastify.db.BlogCategory
            },
            {
              model: fastify.db.BlogMultiLanguage
            },
          ]
        })
        return reply.send(blogs)
      } catch (error) {
        return reply.code(501).send(error)
      }
    }
  }
}

exports.store = (fastify) => {
  return {
    options: {
      onRequest: [fastify.hooks.authenticate],
      schema: {
        description: '',
        tags: ['blog'],
        summary: 'Create blog',
        body: {
          type: 'object',
          required: [
            'locale',
            'slug',
            'subject',
            'description',
            'content',
            'pageTitle',
            'imageCover',
            'publishing',
            'categories',
            'sites',
          ],
          properties: {
            locale: {
              type: 'string',
              enum: ['th', 'en']
            },
            slug: {
              type: 'string',
              minLength: 2
            },
            subject: {
              type: 'string',
              minLength: 2
            },
            description: {
              type: 'string',
              minLength: 2
            },
            content: {
              type: 'string',
              minLength: 2
            },
            pageTitle: {
              type: 'string',
              minLength: 2
            },
            imageCover: {
              type: 'string',
              minLength: 2,
            },
            publishing: {
              type: 'string',
              format: 'date-time'
            },
            categories: {
              type: 'array',
              items: { type: 'integer' }
            },
            sites: {
              type: 'array',
              items: { type: 'integer' }
            },
          }
        }
      }
    },
    handler: async(request, reply) => {
      /* validation */
      const findSlug = await fastify.db.Blog.findOne({
        where: { slug: request.body.slug }
      })
      if (findSlug) {
        return reply.badRequest(fastify.i18n.__('validation.unique', { attribute: 'body.slug' }))
      }
      try {
        return await fastify.db.sequelize.transaction(async(t) => {
          /* Add Blog */
          const tokenData = await fastify.getTokenData(request)
          let blog = await fastify.db.Blog.create({
            userId: tokenData.user.id,
            slug: request.body.slug,
            publishing: request.body.publishing,
            imageCover: request.body.imageCover,
            createdAt: new Date(),
            updatedAt: new Date()
          }, { transaction: t })

          const blogId = blog.id

          /* Add BlogSite */
          for (let siteId of request.body.sites) {
            await blog.addBlogSite(fastify.db.BlogSite.findByPk(siteId), { transaction: t })
              // await fastify.db.BlogBlogSite.create({
              //   blogId: blogId,
              //   blogSiteId: site,
              // }, { transaction: t })
          }

          /* Add BlogBlogCategory */
          for (let categoryId of request.body.categories) {
            await blog.addBlogCategory(fastify.db.BlogCategory.findByPk(categoryId), { transaction: t })
              // await fastify.db.BlogBlogCategory.create({
              //   blogId: blogId,
              //   blogCategoryId: category,
              // }, { transaction: t })
          }

          /* Add BlogMultiLanguage */
          let fieldList = ['subject', 'description', 'pageTitle']
          for (let field of fieldList) {
            await blog.addBlogMultiLanguage({
                blogId: blogId,
                locale: request.body.locale,
                field: field,
                value: request.body[field],
                createdAt: new Date(),
                updatedAt: new Date()
              }, { transaction: t })
              // await fastify.db.BlogMultiLanguage.create({
              //   blogId: blogId,
              //   locale: request.body.locale,
              //   field: field,
              //   value: request.body[field],
              //   createdAt: new Date(),
              //   updatedAt: new Date()
              // }, { transaction: t })
          }
          const blogPath = `storage/public/blog/${blogId}`
          const blogPathFull = path.join(__basedir, blogPath)
          const fileName = uuidv4() + '.html'
          const errMkdirBlog = await mkdirAsync(blogPathFull, { recursive: true })
          if (errMkdirBlog) {
            throw new Error(errMkdirBlog)
          }
          const errWriteFileBlog = await writeFileAsync(`${blogPathFull}/${fileName}`, request.body.content);
          if (errWriteFileBlog) {
            throw new Error(errWriteFileBlog)
          }
          await blog.addBlogMultiLanguage({
              blogId: blogId,
              locale: request.body.locale,
              field: 'content',
              file: `${blogPath}/${fileName}`,
              createdAt: new Date(),
              updatedAt: new Date()
            }, { transaction: t })
            // await fastify.db.BlogMultiLanguage.create({
            //   blogId: blogId,
            //   locale: request.body.locale,
            //   field: 'content',
            //   file: `${blogPath}/${fileName}`,
            //   createdAt: new Date(),
            //   updatedAt: new Date()
            // }, { transaction: t })

          return reply.code(201).send(blog)
        })
      } catch (error) {
        return reply.code(500).send(error)
      }
    }
  }
}

exports.show = (fastify) => {
  return {
    options: {
      onRequest: [fastify.hooks.authenticate],
      schema: {
        description: '',
        tags: ['blog'],
        summary: 'Update blog',
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: {
              type: 'string',
              description: 'blog id'
            }
          }
        }
      }
    },
    handler: async(request, reply) => {
      const blog = await fastify.db.Blog.findByPk(request.params.id)
      if (blog) {
        return reply.send(blog)
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
        tags: ['blog'],
        summary: 'Update blog',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'blog id'
            }
          }
        },
        body: {
          type: 'object',
          required: [
            'locale',
            'slug',
            'subject',
            'description',
            'content',
            'pageTitle',
            'imageCover',
            'publishing',
            'categories',
            'sites',
          ],
          properties: {
            locale: {
              type: 'string',
              enum: ['th', 'en']
            },
            slug: {
              type: 'string',
              minLength: 2
            },
            subject: {
              type: 'string',
              minLength: 2
            },
            description: {
              type: 'string',
              minLength: 2
            },
            content: {
              type: 'string',
              minLength: 2
            },
            pageTitle: {
              type: 'string',
              minLength: 2
            },
            imageCover: {
              type: 'string',
              minLength: 2,
            },
            publishing: {
              type: 'string',
              format: 'date-time'
            },
            categories: {
              type: 'array',
              items: { type: 'integer' }
            },
            sites: {
              type: 'array',
              items: { type: 'integer' }
            },
          }
        }
      }
    },
    handler: async(request, reply) => {
      const blogId = request.params.id

      /* validation */
      const Op = fastify.db.Sequelize.Op
      const findSlug = await fastify.db.Blog.findOne({
        where: {
          slug: request.body.slug,
          id: {
            [Op.not]: blogId
          }
        }
      })
      if (findSlug) {
        return reply.badRequest(fastify.i18n.__('validation.unique', { attribute: 'body.slug' }))
      }

      const blog = fastify.db.Blog.findByPk(blogId)
      if (!blog) {
        return reply.notFound()
      }

      try {
        return await fastify.db.sequelize.transaction(async(t) => {
          /* Add Blog */
          const updateBlog = await fastify.db.Blog.update({
            slug: request.body.slug,
            publishing: request.body.publishing,
            imageCover: request.body.imageCover,
            updatedAt: new Date()
          }, {
            where: {
              id: blogId
            }
          }, { transaction: t })

          /* Add BlogSite */
          for (let site of request.body.sites) {
            await fastify.db.BlogSite.create({
              blogId: blogId,
              blogSiteId: site,
            }, { transaction: t })
          }

          /* Add BlogBlogCategory */
          for (let category of request.body.categories) {
            await fastify.db.BlogBlogCategory.create({
              blogId: blogId,
              blogCategoryId: category,
            }, { transaction: t })
          }

          /* Add BlogMultiLanguage */
          let fieldList = ['subject', 'description', 'pageTitle']
          for (let field of fieldList) {
            await fastify.db.BlogMultiLanguage.create({
              blogId: blogId,
              locale: request.body.locale,
              field: field,
              value: request.body[field],
              createdAt: new Date(),
              updatedAt: new Date()
            }, { transaction: t })
          }
          const blogPath = `storage/public/blog/${blogId}`
          const blogPathFull = path.join(__basedir, blogPath)
          const fileName = uuidv4() + '.html'
          const errMkdirBlog = await mkdirAsync(blogPathFull, { recursive: true })
          if (errMkdirBlog) {
            throw new Error(errMkdirBlog)
          }
          const errWriteFileBlog = await writeFileAsync(`${blogPathFull}/${fileName}`, request.body.content);
          if (errWriteFileBlog) {
            throw new Error(errWriteFileBlog)
          }
          await fastify.db.BlogMultiLanguage.create({
            blogId: blogId,
            locale: request.body.locale,
            field: 'content',
            file: `${blogPath}/${fileName}`,
            createdAt: new Date(),
            updatedAt: new Date()
          }, { transaction: t })

          return reply.code(204).send()
        })
      } catch (error) {
        return reply.code(500).send(error)
      }
    }
  }
}

exports.destroy = (fastify) => {
  return {
    options: {
      onRequest: [fastify.hooks.authenticate],
      schema: {
        description: '',
        tags: ['blog'],
        summary: 'Update blog',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'blog id'
            }
          }
        }
      }
    },
    handler: async(request, reply) => {
      const blogDestroy = await fastify.db.Blog.destroy({
        where: {
          id: request.params.id
        }
      })
      if (blogDestroy == 0) {
        return reply.notFound()
      }
      return reply.code(204).send()
    }
  }
}
