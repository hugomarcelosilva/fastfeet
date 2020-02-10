import path from 'path';
import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import getToken from '../getToken';
import truncate from '../util/truncate';

describe('DeliveryCancel', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to cancel a delivery', async () => {
    const delivery = await factory.attrs('Delivery');
    const delivery_man = await factory.attrs('DeliveryMan');
    const delivery_problem = await factory.attrs('DeliveryProblem');
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

    const responseProblem = await request(app)
      .post(`/delivery/${responseDelivery.body.id}/problems`)
      .send({
        description: delivery_problem.description,
      });

    const { status } = await request(app).delete(
      `/problem/${responseProblem.body.id}/cancel-delivery`
    );

    expect(status).toBe(204);
  });

  it('should not be able to cancel a delivery when delivery problem is not found', async () => {
    const { status } = await request(app).delete('/problem/0/cancel-delivery');

    expect(status).toBe(400);
  });

  it('should not be able to cancel a delivery when delivery end date and signature id has value', async () => {
    const delivery = await factory.attrs('Delivery');
    const delivery_man = await factory.attrs('DeliveryMan');
    const delivery_problem = await factory.attrs('DeliveryProblem');
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
        end_date: new Date(),
      })
      .set('Authorization', `Bearer ${body.token}`);

    const responseProblem = await request(app)
      .post(`/delivery/${responseDelivery.body.id}/problems`)
      .send({
        description: delivery_problem.description,
      });

    const { status } = await request(app).delete(
      `/problem/${responseProblem.body.id}/cancel-delivery`
    );

    expect(status).toBe(401);
  });
});
