import { Sequelize } from 'sequelize';

import config from './../config/config.js';
import setupModels from '../db/models/index.model.js';

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log,
});

setupModels(sequelize);

// Removing sync() since it is not a good function to use for production
//sequelize.sync();

export default sequelize;
