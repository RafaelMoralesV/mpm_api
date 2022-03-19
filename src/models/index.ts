'use strict';

import {Sequelize} from 'sequelize';
import userFactory from './user';
import cardFactory from './card';
import userUserFactory from './useruser';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.js')[env];


const sequelize: Sequelize = env === 'test' ?
new Sequelize('sqlite::memory:', {logging: console.log}) :
new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
);


const db = {
  sequelize,
  Sequelize,
  User: userFactory(sequelize),
  Card: cardFactory(sequelize),
  UserUser: userUserFactory(sequelize),
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

if (env === 'test') {
  sequelize.sync();
}

export default db;
