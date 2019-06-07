'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlogBlogSite = sequelize.define('BlogBlogSite', {
    blogId: DataTypes.INTEGER,
    blogSiteId: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  BlogBlogSite.associate = function (models) {
    // associations can be defined here
  };
  return BlogBlogSite;
};
