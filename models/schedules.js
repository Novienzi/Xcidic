'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.reservations)
      this.belongsTo(models.meals)
      this.belongsTo(models.branches)
    }
  };
  schedules.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: v4
    },
    branchId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "branches",
        key: "id"
      }
    },
    mealId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "meals",
        key: "id"
      }
    },
    maxCapacity: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'schedules',
    timestamps: false
  });
  return schedules;
};