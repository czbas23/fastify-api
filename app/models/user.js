'use strict';
var _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: 'compositeIndex' },
    password: DataTypes.STRING,
    user_type: DataTypes.ENUM([
      'superadmin',
      'admin',
      'user'
    ])
  }, {
    timestamps: true
  });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Blog);
  };
  return User;
};
