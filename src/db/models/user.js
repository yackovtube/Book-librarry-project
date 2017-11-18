'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: { 
      type: DataTypes.STRING(32), 
      unique: true 
    },
    password: DataTypes.STRING(512),
    salt: DataTypes.STRING(4)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};