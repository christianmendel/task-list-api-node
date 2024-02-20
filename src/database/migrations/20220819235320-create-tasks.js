'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true
      },
      task: {
        type: Sequelize.STRING,
        allowNull:false
      },
      check:{
        type: Sequelize.BOOLEAN,
        defaultValue:false,
        allowNull:false
      },
      user_id:{
        type: Sequelize.INTEGER,
        references: {model : 'users', key:'id'},
        onUpdate:'CASCADE',
        onDelet: 'SET NULL',
        allowNull:false
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull:false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull:false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
