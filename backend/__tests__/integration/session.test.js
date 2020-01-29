import app from '../../src/app';
import factory from '../factories';
import request from 'supertest';
import truncate from '../util/truncate';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be able to login', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Distruidora FastFeet',
        email: 'admin@fastfeet.com',
        password: '123456',
      });

    const response = await request(app)
      .post('/sessions')
      .send({ email: 'admin@fastfeet.com', password: '123456' });

    expect(response.body).toHaveProperty('token');
  });

  it('Should not be able to login with a unregistred email', async () => {
    const user = await factory.attrs('Session');

    const response = await request(app)
      .post('/sessions')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('Should not be able to login with a wrong password', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Distruidora FastFeet',
        email: 'admin@fastfeet.com',
        password: '123456',
      });

    const response = await request(app)
      .post('/sessions')
      .send({ email: 'admin@fastfeet.com', password: 'wrongPassword' });

    expect(response.status).toBe(401);
  });

  it('Should not be able to login without put a email', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ email: '', password: 'notPutEmail' });

    expect(response.status).toBe(400);
  });

  it('Should not be able to login without put a password', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'admin@fastfeet.com', password: '' });

    expect(response.status).toBe(400);
  });
});
