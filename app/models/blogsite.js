'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlogSite = sequelize.define('BlogSite', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    timestamps: true
  });
  BlogSite.associate = function (models) {
    // associations can be defined here
    BlogSite.belongsToMany(models.Blog, { through: models.BlogBlogSite })
  };
  return BlogSite;
};
