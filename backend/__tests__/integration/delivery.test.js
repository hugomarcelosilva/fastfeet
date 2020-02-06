import request from 'supertest';
import path from 'path';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';

describe('Delivery', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to list deliveries', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get('/deliveries')
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to register a new delivery', async () => {
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

    const response = await request(app)
      .post('/deliveries')
      .send({
        recipient_id: responseRecipient.body.id,
        deliveryman_id: responseDeliveryMan.body.id,
        signature_id: responseFile.body.id,
        product: delivery.product,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register a new delivery when recipient is not found', async () => {
    const delivery = await factory.attrs('Delivery');
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

    const { status } = await request(app)
      .post('/deliveries')
      .send({
        recipient_id: 0,
        deliveryman_id: responseDeliveryMan.body.id,
        signature_id: responseFile.body.id,
        product: delivery.product,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should not be able to register a new delivery when deliveryman is not found', async () => {
    const delivery = await factory.attrs('Delivery');
    const recipient = await factory.attrs('Recipient');

    const { body } = await getToken();

    const responseFile = await request(app)
      .post('/files')
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .set('Authorization', `Bearer ${body.token}`);

    const responseRecipient = await request(app)
      .post('/recipients')
      .send(recipient)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post('/deliveries')
      .send({
        recipient_id: responseRecipient.body.id,
        deliveryman_id: 0,
        signature_id: responseFile.body.id,
        product: delivery.product,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should not be able to register a new delivery when signature is not found', async () => {
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

    const { status } = await request(app)
      .post('/deliveries')
      .send({
        recipient_id: responseRecipient.body.id,
        deliveryman_id: responseDeliveryMan.body.id,
        signature_id: 0,
        product: delivery.product,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should not be able to register a new delivery when some field is missing', async () => {
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

    const { status } = await request(app)
      .post('/deliveries')
      .send({
        recipient_id: responseRecipient.body.id,
        deliveryman_id: responseDeliveryMan.body.id,
        signature_id: responseFile.body.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should not be able to register delivery with duplicated fields', async () => {
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

    await request(app)
      .post('/deliveries')
      .send({
        recipient_id: responseRecipient.body.id,
        deliveryman_id: responseDeliveryMan.body.id,
        signature_id: responseFile.body.id,
        product: delivery.product,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post('/deliveries')
      .send({
        recipient_id: responseRecipient.body.id,
        deliveryman_id: responseDeliveryMan.body.id,
        signature_id: responseFile.body.id,
        product: delivery.product,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(401);
  });

  it('should be able to update delivery', async () => {
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

    const response = await request(app)
      .post('/deliveries')
      .send({
        recipient_id: responseRecipient.body.id,
        deliveryman_id: responseDeliveryMan.body.id,
        signature_id: responseFile.body.id,
        product: delivery.product,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const updatedDelivery = await request(app)
      .put(`/deliveries/${response.body.id}`)
      .send({
        product: 'Updated Name',
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedDelivery.body.product).toBe('Updated Name');
  });

  it('should not be able to update delivery with the same product as another delivery', async () => {
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

    await request(app)
      .post('/deliveries')
      .send({
        recipient_id: responseRecipient.body.id,
        deliveryman_id: responseDeliveryMan.body.id,
        signature_id: responseFile.body.id,
        product: 'product_1',
      })
      .set('Authorization', `Bearer ${body.token}`);

    const response = await request(app)
      .post('/deliveries')
      .send({
        recipient_id: responseRecipient.body.id,
        deliveryman_id: responseDeliveryMan.body.id,
        signature_id: responseFile.body.id,
        product: 'product_2',
      })
      .set('Authorization', `Bearer ${body.token}`);

    const updatedDelivery = await request(app)
      .put(`/deliveries/${response.body.id}`)
      .send({
        product: 'product_1',
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedDelivery.status).toBe(401);
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

    const response = await request(app)
      .post('/deliveries')
      .send({
        recipient_id: responseRecipient.body.id,
        deliveryman_id: responseDeliveryMan.body.id,
        signature_id: responseFile.body.id,
        product: delivery.product,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const updatedDelivery = await request(app)
      .put(`/deliveries/${response.body.id}`)
      .send({})
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedDelivery.status).toBe(400);
  });

  it('should not be able to update delivery if does not exist', async () => {
    const delivery = await factory.attrs('Delivery');

    const { body } = await getToken();

    const updatedDelivery = await request(app)
      .put('/deliveries/999')
      .send({
        product: delivery.product,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedDelivery.status).toBe(400);
  });

  it('should be able to delete a delivery', async () => {
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

    const response = await request(app)
      .post('/deliveries')
      .send({
        recipient_id: responseRecipient.body.id,
        deliveryman_id: responseDeliveryMan.body.id,
        signature_id: responseFile.body.id,
        product: delivery.product,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .delete(`/deliveries/${response.body.id}`)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(204);
  });

  it('should not be able to delete a delivery if does not exist', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .delete('/deliveries/0')
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });
});
