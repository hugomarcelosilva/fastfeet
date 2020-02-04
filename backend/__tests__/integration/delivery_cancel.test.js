import request from 'supertest';
import app from '../../src/app';
import path from 'path';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';

describe('DeliveryCancel', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to cancel a delivery', async () => {
    const delivery = await factory.attrs('Delivery');
    const delivery_man = await factory.attrs('DeliveryMan');
    const recipient = await factory.attrs('Recipient');

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

    const responseRecipient = await request(app)
      .post('/recipients')
      .send(recipient)
      .set('Authorization', `Bearer ${body.token}`);

    const responseDelivery = await request(app)
      .post('/deliveries')
      .send({
        recipient_id: responseRecipient.body.id,
        deliveryman_id: responseDeliveryMan.body.id,
        signature_id: responseFile.body.id,
        product: delivery.product,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const response = await request(app).post(
      `/problem/${responseDelivery.body.id}/cancel-delivery`
    );

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to cancel a delivery when delivery is not found', async () => {
    const { status } = await request(app).post('/problem/0/cancel-delivery');

    expect(status).toBe(400);
  });
});
