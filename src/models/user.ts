/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';

import {Sequelize} from 'sequelize';

import {Model} from 'sequelize';

interface UserAttributes {
  id: number,
  name: string,
  email: string,
  password: string,
}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!: number;
    name!: string;
    email!: string;
    password!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      // this.hasMany()
    }
  }
  User.init({
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
