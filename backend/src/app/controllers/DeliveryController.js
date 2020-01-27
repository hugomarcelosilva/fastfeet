import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import File from '../models/File';

class DeliveryController {
  async index(req, res) {
    const { id } = req.query;

    if (id) {
      const deliveryExists = await Delivery.findByPk(id);

      if (!deliveryExists) {
        return res.status(400).json({ error: 'Delivery not found.' });
      }

      return res.json(deliveryExists);
    }

    const deliveries = await Delivery.findAll();

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryManExists = await DeliveryMan.findOne({
      where: { email: req.body.email },
    });

    if (deliveryManExists) {
      return res.status(400).json({ error: 'DeliveryMan already exists.' });
    }

    const deliveryMan = await DeliveryMan.create(req.body);

    return res.json(deliveryMan);
  }

  async update(req, res) {}

  async delete(req, res) {
    const { id } = req.params;

    const deliveryExists = await Delivery.findByPk(id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    await deliveryExists.destroy(id);

    return res.json();
  }
}

export default new DeliveryController();
