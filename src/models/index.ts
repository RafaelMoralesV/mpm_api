'use strict';

import {Sequelize} from 'sequelize';
import userFactory from './user';
import cardFactory from './card';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.js')[env];


const sequelize: Sequelize = new Sequelize(
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
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
