'use strict';
const db = require('../../app/models')
const bcrypt = require('bcrypt');
require('dotenv').config()

module.exports = {
  up: async(queryInterface, Sequelize) => {
    let dataSeed = [{
      name: 'superadmin',
      email: process.env.SA_EMAIL,
      password: process.env.SA_PASSWORD,
      user_type: 'superadmin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    let dataInsert = []
    for (let item of dataSeed) {
      let users = await db.User.findAll({
        where: {
          email: item.email,
        }
      });
      if (users.length == 0) {
        item.password = await new Promise(resolve => {
          bcrypt.hash(item.password, 10, function (err, hash) {
            resolve(hash)
          });
        })
        dataInsert.push(item)
      }
    }
    if (dataInsert.length) {
      return queryInterface.bulkInsert('Users', dataInsert, {});
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
