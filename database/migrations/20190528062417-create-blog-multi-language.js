'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BlogMultiLanguages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blogId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      locale: {
        allowNull: false,
        type: Sequelize.STRING
      },
      field: {
        allowNull: false,
        type: Sequelize.STRING
      },
      value: {
        allowNull: true,
        type: Sequelize.STRING
      },
      file: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BlogMultiLanguages');
  }
};
