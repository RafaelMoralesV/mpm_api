/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';

import {Sequelize} from 'sequelize/dist';
import CardAttributes from '../interfaces/card';
import {Model} from 'sequelize';

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Card extends Model<CardAttributes> implements CardAttributes {
    id!: number;
    name!: string;
    uuid!: string;
    stock!: number;
    UserId!: number;


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      this.belongsTo(models.User);
    }
  }
  Card.init({
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: DataTypes.STRING,
    uuid: DataTypes.STRING,
    stock: DataTypes.NUMBER,
    UserId: DataTypes.NUMBER,
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};
