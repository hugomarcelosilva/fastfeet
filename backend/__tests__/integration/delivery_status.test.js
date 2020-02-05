import request from 'supertest';
import path from 'path';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';

describe('DeliveryStatus', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to list deliveries to delivery man that are not canceled or delivered', async () => {
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
      `/deliveryman/${responseDeliveryMan.body.id}/deliveries`
    );

    expect(status).toBe(200);
  });

  it('should not be able to list deliveries when delivery man is not found', async () => {
    const { status } = await request(app).get('/deliveryman/0/deliveries');

    expect(status).toBe(400);
  });

  it('should be able to update the start date of delivery', async () => {
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

    const updatedDeliveryStatus = await request(app)
      .put(`/deliveryman/${responseDeliveryMan.body.id}/deliveries`)
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .query({ deliveryId: responseDelivery.body.id })
      .query({ start_date: '2019-02-05' });

    expect(updatedDeliveryStatus.body.start_date).toBe('2019-02-05');
  });

  it('should be able to update the end date of delivery', async () => {
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

    const updatedDeliveryStatus = await request(app)
      .put(`/deliveryman/${responseDeliveryMan.body.id}/deliveries`)
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .query({ deliveryId: responseDelivery.body.id })
      .query({ end_date: '2019-02-05' });

    expect(updatedDeliveryStatus.body.end_date).toBe('2019-02-05');
  });

  it('should not be able to update delivery if validation fails', async () => {
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

    const updatedDeliveryStatus = await request(app)
      .put(`/deliveryman/${responseDeliveryMan.body.id}/deliveries`)
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .query({ deliveryId: responseDelivery.body.id })
      .query({ start_date: '20' });

    expect(updatedDeliveryStatus.status).toBe(400);
  });

  it('should not be able to update if delivery man not found', async () => {
    const updatedDeliveryStatus = await request(app)
      .put('/deliveryman/0/deliveries')
      .attach('file', path.join(__dirname, 'img/avatar.jpg'));

    expect(updatedDeliveryStatus.status).toBe(400);
  });

  it('should not be able to update if delivery not found', async () => {
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

    const updatedDeliveryStatus = await request(app)
      .put(`/deliveryman/${responseDeliveryMan.body.id}/deliveries`)
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .query({ deliveryId: 0 });

    expect(updatedDeliveryStatus.status).toBe(400);
  });

  it('should not be able to update if delivery not registered to delivery man', async () => {
    const delivery = await factory.attrs('Delivery');
    const deliveryman_1 = await factory.attrs('DeliveryMan');
    const deliveryman_2 = await factory.attrs('DeliveryMan');
    const recipient = await factory.attrs('Recipient');

    const { body } = await getToken();

    const responseFile = await request(app)
      .post('/files')
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .set('Authorization', `Bearer ${body.token}`);

    const responseDeliveryMan_1 = await request(app)
      .post('/deliverymen')
      .send({
        name: deliveryman_1.name,
        email: deliveryman_1.email,
        avatar_id: responseFile.body.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const responseDeliveryMan_2 = await request(app)
      .post('/deliverymen')
      .send({
        name: deliveryman_2.name,
        email: 'deliveryman_2@email.com',
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
        deliveryman_id: responseDeliveryMan_1.body.id,
        signature_id: responseFile.body.id,
        product: delivery.product,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const updatedDeliveryStatus = await request(app)
      .put(`/deliveryman/${responseDeliveryMan_2.body.id}/deliveries`)
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .query({ deliveryId: responseDelivery.body.id })
      .query({ start_date: '2019-02-05' });

    expect(updatedDeliveryStatus.status).toBe(400);
  });

  it('should not be able to update if start date or end date not provided', async () => {
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

    const updatedDeliveryStatus = await request(app)
      .put(`/deliveryman/${responseDeliveryMan.body.id}/deliveries`)
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .query({ deliveryId: responseDelivery.body.id });

    expect(updatedDeliveryStatus.status).toBe(400);
  });

  it('should not be able to update if delivery man has reached 5 pickups in one day', async () => {
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

    const todayDate = new Date();

    await factory.createMany('Delivery', 5, {
      deliveryman_id: responseDeliveryMan.body.id,
      start_date: todayDate,
    });

    const updatedDeliveryStatus = await request(app)
      .put(`/deliveryman/${responseDeliveryMan.body.id}/deliveries`)
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .query({ deliveryId: responseDelivery.body.id })
      .query({ start_date: todayDate });

    expect(updatedDeliveryStatus.status).toBe(401);
  });
});
