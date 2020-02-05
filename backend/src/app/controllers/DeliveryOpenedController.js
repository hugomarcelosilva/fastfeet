import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';

class DeliveryOpenedController {
  async index(req, res) {
    const deliveryManExists = await DeliveryMan.findByPk(req.params.id);

    if (!deliveryManExists) {
      return res.status(400).json({ error: 'DeliveryMan not found.' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: deliveryManExists.id,
        [Op.or]: [{ canceled_at: null }, { end_date: null }],
      },
    });

    return res.json(deliveries);
  }
}

export default new DeliveryOpenedController();
