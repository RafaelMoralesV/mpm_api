/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';

import {Sequelize} from 'sequelize';

const {
  Model,
} = require('sequelize');
module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class CollectionEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  CollectionEntry.init({
    user_id: DataTypes.INTEGER,
    card_id: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CollectionEntry',
  });
  return CollectionEntry;
};
