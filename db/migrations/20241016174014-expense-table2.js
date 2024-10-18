'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Expenses', {  // Changed 'Expense' to 'Expenses'
      amount: {
        type: Sequelize.INTEGER,  // Ensure DataTypes is from Sequelize
        allowNull: false,
        validate: {
          notNull: {
            msg: "Amount is required",
          },
          isInt: {
            msg: "Amount must be an integer",
          },
        },
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category is required",
          },
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
          notNull: {
            msg: "Date is required",
          },
          isDate: {
            msg: "Date must be valid",
          },
        },
      },
      payment_method: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Payment method is required",
          },
        },
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        
      },
      id: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('Expenses'); 
  }
};
