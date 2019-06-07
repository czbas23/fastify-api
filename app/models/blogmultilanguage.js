'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlogMultiLanguage = sequelize.define('BlogMultiLanguage', {
    blogId: DataTypes.INTEGER,
    locale: DataTypes.STRING,
    field: DataTypes.STRING,
    value: DataTypes.STRING,
    file: DataTypes.STRING
  }, {
    timestamps: true
  });
  BlogMultiLanguage.associate = function (models) {
    // associations can be defined here
    BlogMultiLanguage.belongsTo(models.Blog);
  };
  return BlogMultiLanguage;
};
