'use strict';
module.exports = (sequelize, DataTypes) => {
  const Upload = sequelize.define('Upload', {
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    timestamps: true
  });
  Upload.associate = function (models) {
    // associations can be defined here
  };
  return Upload;
};
