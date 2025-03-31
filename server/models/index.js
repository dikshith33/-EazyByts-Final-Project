import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.js';
import UserModel from './user.js';
import EventModel from './event.js';
import BookingModel from './booking.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

const db = {};

// Initialize models
db.User = UserModel(sequelize, DataTypes);
db.Event = EventModel(sequelize, DataTypes);
db.Booking = BookingModel(sequelize, DataTypes);

// Associations
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
