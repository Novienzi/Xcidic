'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.reservations)
    }
  };
  users.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: v4
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "please enter the right email format"
        },
      },
    },
    phoneNumber: {
      type: DataTypes.TEXT(13),
      allowNull: true,
      validate: {
        is: ["^[0-9]+$", 'i'],
        min: 10
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT(10, 6),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT(10, 6),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'users',
    timestamps: false
  });
  return users;
};