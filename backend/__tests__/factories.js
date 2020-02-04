import faker from 'faker';
import { factory } from 'factory-girl';

import Delivery from '../src/app/models/Delivery';
import DeliveryMan from '../src/app/models/DeliveryMan';
import DeliveryProblem from '../src/app/models/DeliveryProblem';
import Recipient from '../src/app/models/Recipient';
import User from '../src/app/models/User';

factory.define('Delivery', Delivery, {
  product: faker.commerce.product(),
});

factory.define('DeliveryMan', DeliveryMan, {
  name: faker.name.findName(),
  email: faker.internet.email(),
});

factory.define('DeliveryProblem', DeliveryProblem, {
  description: faker.lorem.text(),
});

factory.define('Recipient', Recipient, {
  name: faker.name.findName(),
  street: faker.address.streetName(),
  number: faker.random.number(999),
  complement: faker.address.secondaryAddress(),
  state: faker.address.state(),
  city: faker.address.city(),
  zip_code: faker.address.zipCode(),
});

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
