'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlogCategory = sequelize.define('BlogCategory', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    parent: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  BlogCategory.associate = function (models) {
    // associations can be defined here
    BlogCategory.belongsToMany(models.Blog, { through: models.BlogBlogCategory })
  };
  return BlogCategory;
};
