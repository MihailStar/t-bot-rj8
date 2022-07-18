import { Sequelize } from 'sequelize';
import { configuration } from '../common/configuration';

const options =
  configuration.NODE_ENV === 'development' ? {} : { logging: false };

const sequelize = new Sequelize(configuration.DB_URL, options);

export { sequelize as db };
