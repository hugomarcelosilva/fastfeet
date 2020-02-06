import request from 'supertest';
import path from 'path';
import app from '../../src/app';

import getToken from '../getToken';

describe('File', () => {
  it('should be able to register a new file', async () => {
    const { body } = await getToken();

    const response = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${body.token}`)
      .attach('file', path.join(__dirname, 'img/avatar.jpg'));

    expect(response.body).toHaveProperty('id');
  });
});
