import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';

class DeliveryClosedController {
  async index(req, res) {
    const deliveryManExists = await DeliveryMan.findByPk(req.params.id);

    if (!deliveryManExists) {
      return res.status(400).json({ error: 'DeliveryMan not found.' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: deliveryManExists.id,
        end_date: {
          [Op.not]: null,
        },
      },
    });

    return res.json(deliveries);
  }
}

export default new DeliveryClosedController();
