/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';

import {Sequelize} from 'sequelize';

import {Model} from 'sequelize';

interface CollectionEntryAttributes {
  id: number,
  userId: number,
  cardId: string,
  stock: number,
}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class CollectionEntry extends Model<CollectionEntryAttributes>
    implements CollectionEntryAttributes {
    id!: number;
    userId!: number;
    cardId!: string;
    stock!: number;

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
    id: {type: DataTypes.INTEGER, primaryKey: true},
    userId: DataTypes.INTEGER,
    cardId: DataTypes.UUID,
    stock: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CollectionEntry',
  });
  return CollectionEntry;
};
