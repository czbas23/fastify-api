'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    userId: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    publishing: DataTypes.DATE,
    imageCover: DataTypes.STRING
  }, {
    timestamps: true
  });
  Blog.associate = function (models) {
    // associations can be defined here
    Blog.belongsTo(models.User);
    Blog.belongsToMany(models.BlogSite, { through: models.BlogBlogSite })
    Blog.belongsToMany(models.BlogCategory, { through: models.BlogBlogCategory })
    Blog.hasMany(models.BlogMultiLanguage);
  };
  return Blog;
};
