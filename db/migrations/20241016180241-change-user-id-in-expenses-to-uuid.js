'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create a temporary column for UUID
    await queryInterface.addColumn('Expenses', 'temp_user_id', {
      type: Sequelize.UUID,
      allowNull: false,
    });

    // Populate the temporary column with existing user_id data (if applicable)
    // Example logic to fetch UUIDs based on existing user_id if you have a mapping
    // await queryInterface.sequelize.query(`
    //   UPDATE "Expenses" e
    //   SET temp_user_id = (SELECT u.uuid FROM "Users" u WHERE u.id = e.user_id)
    // `);

    // Remove the old user_id column
    await queryInterface.removeColumn('Expenses', 'user_id');

    // Rename the temporary column to user_id
    await queryInterface.renameColumn('Expenses', 'temp_user_id', 'user_id');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the migration
    await queryInterface.addColumn('Expenses', 'user_id', {
      type: Sequelize.INTEGER, // Adjust if necessary
      allowNull: false,
    });

    // Populate back the user_id column if needed
    // Example logic to set back user_id if you have the mapping
    // await queryInterface.sequelize.query(`
    //   UPDATE "Expenses" e
    //   SET user_id = (SELECT u.id FROM "Users" u WHERE u.uuid = e.user_id)
    // `);

    await queryInterface.removeColumn('Expenses', 'user_id');
  },
};
