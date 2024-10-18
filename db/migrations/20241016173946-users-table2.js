'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usermodeldata', {
      user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
        created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, // Set default to current timestamp
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, // Set default to current timestamp
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usermodeldata'); 
  }
};
