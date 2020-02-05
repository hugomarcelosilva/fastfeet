import request from 'supertest';
import path from 'path';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';

describe('DeliveryOpened', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to list openeds deliveries', async () => {
    const delivery_man = await factory.attrs('DeliveryMan');

    const { body } = await getToken();

    const responseFile = await request(app)
      .post('/files')
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .set('Authorization', `Bearer ${body.token}`);

    const responseDeliveryMan = await request(app)
      .post('/deliverymen')
      .send({
        name: delivery_man.name,
        email: delivery_man.email,
        avatar_id: responseFile.body.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app).get(
      `/deliveryman/${responseDeliveryMan.body.id}/deliveries/available`
    );

    expect(status).toBe(200);
  });

  it('should not be able to list openeds deliveries if delivery man not found', async () => {
    const { status } = await request(app).get(
      '/deliveryman/0/deliveries/available'
    );

    expect(status).toBe(400);
  });
});
