import request from 'supertest';
import path from 'path';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';

describe('DeliveryMan', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to list deliverymen', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get('/deliverymen')
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to register a new deliveryman', async () => {
    const delivery_man = await factory.attrs('DeliveryMan');

    const { body } = await getToken();

    const responseFile = await request(app)
      .post('/files')
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .set('Authorization', `Bearer ${body.token}`);

    const response = await request(app)
      .post('/deliverymen')
      .send({
        name: delivery_man.name,
        email: delivery_man.email,
        avatar_id: responseFile.body.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register a new deliveryman when file is not found', async () => {
    const delivery_man = await factory.attrs('DeliveryMan');

    const { body } = await getToken();

    const { status } = await request(app)
      .post('/deliverymen')
      .send({
        name: delivery_man.name,
        email: delivery_man.email,
        avatar_id: 0,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should not be able to register a new deliveryman when some field is missing', async () => {
    const delivery_man = {
      name: 'DeliveryMan test',
      email: 'deliveryman@test.com',
    };

    const { body } = await getToken();

    const { status } = await request(app)
      .post('/deliverymen')
      .send(delivery_man)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should not be able to register deliveryman with duplicated email', async () => {
    const delivery_man = await factory.attrs('DeliveryMan');

    const { body } = await getToken();

    const responseFile = await request(app)
      .post('/files')
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .set('Authorization', `Bearer ${body.token}`);

    await request(app)
      .post('/deliverymen')
      .send({
        name: delivery_man.name,
        email: delivery_man.email,
        avatar_id: responseFile.body.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post('/deliverymen')
      .send({
        name: delivery_man.name,
        email: delivery_man.email,
        avatar_id: responseFile.body.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(401);
  });

  it('should be able to update deliveryman', async () => {
    const delivery_man = await factory.attrs('DeliveryMan');

    const { body } = await getToken();

    const responseFile = await request(app)
      .post('/files')
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .set('Authorization', `Bearer ${body.token}`);

    const response = await request(app)
      .post('/deliverymen')
      .send({
        name: delivery_man.name,
        email: delivery_man.email,
        avatar_id: responseFile.body.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const updatedDeliveryMan = await request(app)
      .put(`/deliverymen/${response.body.id}`)
      .send({
        name: 'Updated Name',
        email: 'deliveryman@email.com',
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedDeliveryMan.body.name).toBe('Updated Name');
  });

  it('should not be able to update deliveryman with the same email as another deliveryman', async () => {
    const deliveryman_1 = await factory.attrs('DeliveryMan');
    const deliveryman_2 = await factory.attrs('DeliveryMan');

    const { body } = await getToken();

    const responseFile = await request(app)
      .post('/files')
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .set('Authorization', `Bearer ${body.token}`);

    await request(app)
      .post('/deliverymen')
      .send({
        name: deliveryman_1.name,
        email: 'deliveryman1@email.com',
        avatar_id: responseFile.body.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const response = await request(app)
      .post('/deliverymen')
      .send({
        name: deliveryman_2.name,
        email: 'deliveryman2@email.com',
        avatar_id: responseFile.body.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const updatedDeliveryMan = await request(app)
      .put(`/deliverymen/${response.body.id}`)
      .send({
        name: deliveryman_1.name,
        email: 'deliveryman1@email.com',
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedDeliveryMan.status).toBe(401);
  });

  it('should not be able to update deliveryman if validation fails', async () => {
    const delivery_man = await factory.attrs('DeliveryMan');

    const { body } = await getToken();

    const responseFile = await request(app)
      .post('/files')
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .set('Authorization', `Bearer ${body.token}`);

    const response = await request(app)
      .post('/deliverymen')
      .send({
        name: delivery_man.name,
        email: delivery_man.email,
        avatar_id: responseFile.body.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const updatedDeliveryMan = await request(app)
      .put(`/deliverymen/${response.body.id}`)
      .send({})
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedDeliveryMan.status).toBe(400);
  });

  it('should not be able to update deliveryman if does not exist', async () => {
    const delivery_man = await factory.attrs('DeliveryMan');

    const { body } = await getToken();

    const responseFile = await request(app)
      .post('/files')
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .set('Authorization', `Bearer ${body.token}`);

    await request(app)
      .post('/deliverymen')
      .send({
        name: delivery_man.name,
        email: delivery_man.email,
        avatar_id: responseFile.body.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const updatedDeliveryMan = await request(app)
      .put('/deliverymen/999')
      .send({
        name: delivery_man.name,
        email: delivery_man.email,
        avatar_id: responseFile.body.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedDeliveryMan.status).toBe(400);
  });

  it('should be able to delete a deliveryman', async () => {
    const delivery_man = await factory.attrs('DeliveryMan');

    const { body } = await getToken();

    const responseFile = await request(app)
      .post('/files')
      .attach('file', path.join(__dirname, 'img/avatar.jpg'))
      .set('Authorization', `Bearer ${body.token}`);

    const response = await request(app)
      .post('/deliverymen')
      .send({
        name: delivery_man.name,
        email: delivery_man.email,
        avatar_id: responseFile.body.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .delete(`/deliverymen/${response.body.id}`)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(204);
  });

  it('should not be able to delete a deliveryman if does not exist', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .delete('/deliverymen/0')
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });
});
