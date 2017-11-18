'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Users', 'username', {
      type: Sequelize.STRING,
      allowNull: true,
    })
      .then(() => {
        queryInterface.addColumn('Users', 'password', {
          type: Sequelize.STRING,
          allowNull: true,
        })
      })

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('Users', 'username')
      .then(() => queryInterface.removeColumn('Users', 'password'))

  }
};
