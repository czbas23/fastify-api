'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlogBlogCategory = sequelize.define('BlogBlogCategory', {
    blogId: DataTypes.INTEGER,
    blogCategoryId: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  BlogBlogCategory.associate = function (models) {
    // associations can be defined here
  };
  return BlogBlogCategory;
};
