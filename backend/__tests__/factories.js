import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
});

factory.define('Session', User, {
  email: faker.internet.email(),
  password: faker.internet.password(8),
});

export default factory;
