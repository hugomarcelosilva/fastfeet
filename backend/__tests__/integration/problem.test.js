import request from 'supertest';
import app from '../../src/app';

describe('Problem', () => {
  it('should be able to list problems', async () => {
    const { status } = await request(app).get('/problems');

    expect(status).toBe(200);
  });
});
