import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import File from '../models/File';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';

import DeliveryMail from '../jobs/DeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll();

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id, signature_id } = req.body;

    const recipient = await Recipient.findOne({
      where: { id: recipient_id },
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const delivery_man = await DeliveryMan.findOne({
      where: { id: deliveryman_id },
    });

    if (!delivery_man) {
      return res.status(400).json({ error: 'DeliveryMan not found' });
    }

    const signature = await File.findOne({
      where: { id: signature_id },
    });

    if (!signature) {
      return res.status(400).json({ error: 'Signature not found' });
    }

    const deliveryExists = await Delivery.findOne({
      where: {
        recipient_id,
        deliveryman_id,
        signature_id,
        product: req.body.product,
      },
    });

    if (deliveryExists) {
      return res.status(401).json({ error: 'Delivery already exists.' });
    }

    const delivery = await Delivery.create(req.body);

    await Queue.add(DeliveryMail.key, {
      delivery_man,
      delivery,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const deliveryExists = await Delivery.findByPk(id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    const { product } = req.body;

    if (product && product !== deliveryExists.product) {
      const productExists = await Delivery.findOne({
        where: { product },
      });

      if (productExists) {
        return res.status(401).json({ error: 'Delivery already exists.' });
      }
    }

    await deliveryExists.update(req.body);

    const { recipient, delivery_man, signature } = await Delivery.findByPk(id, {
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      product,
      recipient,
      delivery_man,
      signature,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryExists = await Delivery.findByPk(id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    await deliveryExists.destroy(id);

    return res.status(204).send();
  }
}

export default new DeliveryController();
