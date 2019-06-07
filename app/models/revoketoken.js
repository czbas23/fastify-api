'use strict';
module.exports = (sequelize, DataTypes) => {
  const RevokeToken = sequelize.define('RevokeToken', {
    token: DataTypes.STRING
  }, {
    timestamps: true
  });
  RevokeToken.associate = function(models) {
    // associations can be defined here
  };
  return RevokeToken;
};