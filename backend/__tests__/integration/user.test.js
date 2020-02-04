import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when new user is created', async () => {
    const user = await factory.create('User', {
      password: '12345678',
    });

    const compareHash = await bcrypt.compare('12345678', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with a duplicated email', async () => {
    const user = await factory.attrs('User', { email: 'duplicated@gmail.com' });
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(401);
  });

  it('should not be able to register a new user when some field is missing', async () => {
    const user = {
      name: 'Recipient test',
      email: 'user@email.com',
    };

    const { status } = await request(app)
      .post('/users')
      .send(user);

    expect(status).toBe(400);
  });
});
