/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';

import {
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  NonAttribute,
} from 'sequelize';
import {Model} from 'sequelize';
import bcrypt from 'bcrypt';
import {Card} from './card';

const PASSWORD_SALT_ROUNDS = 11;

export class User
  extends Model<
      InferAttributes<User>,
      InferCreationAttributes<User, {omit: 'id'}>
  > {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getCards: HasManyGetAssociationsMixin<Card>;
  declare addCard: HasManyAddAssociationMixin<Card, number>;
  declare addCards: HasManySetAssociationsMixin<Card, number>;
  declare removeCard: HasManyRemoveAssociationMixin<Card, number>;
  declare removeCards: HasManyRemoveAssociationsMixin<Card, number>;
  declare hasCard: HasManyHasAssociationMixin<Card, number>;
  declare hasCards: HasManyHasAssociationsMixin<Card, number>;
  declare countCards: HasManyCountAssociationsMixin;
  declare createCard: HasManyCreateAssociationMixin<Card, 'UserId'>;

  declare cards?: NonAttribute<Card[]>;

  /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  static associate(models: any) {
    // define association here
    this.hasMany(models.Card);
  }
  async checkPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}

export default (sequelize: Sequelize): typeof User => {
  User.init({
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
  });


  User.beforeSave(async (instance) => {
    if (instance.changed('password')) {
      const hash =
            await bcrypt.hash(instance.password, PASSWORD_SALT_ROUNDS);
      instance.set('password', hash);
    }
  });

  return User;
};
