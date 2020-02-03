import Sequelize from 'sequelize';

import Delivery from '../app/models/Delivery';
import DeliveryMan from '../app/models/DeliveryMan';
import DeliveryProblem from '../app/models/DeliveryProblem';
import File from '../app/models/File';
import Recipient from '../app/models/Recipient';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [Delivery, DeliveryMan, DeliveryProblem, File, Recipient, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
