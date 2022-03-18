/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';

import {
  Sequelize,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from 'sequelize';
import {Model} from 'sequelize';
import {User} from './user';

export class Card extends Model<
  InferAttributes<Card>,
  InferCreationAttributes<Card, {omit: 'id'}>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare uuid: string;
  declare stock: number;
  declare UserId: number;

  declare user?: NonAttribute<User>;

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


export default (sequelize: Sequelize) => {
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
