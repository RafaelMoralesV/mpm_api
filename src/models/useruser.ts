/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class UserUser
  extends Model<
    InferAttributes<UserUser>,
    InferCreationAttributes<UserUser>> {
  declare userID1: number;
  declare userID2: number;
  declare confirmed: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default (sequelize: Sequelize) => {
  UserUser.init({
    userID1: DataTypes.INTEGER,
    userID2: DataTypes.INTEGER,
    confirmed: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'UserUser',
  });
  return UserUser;
};
