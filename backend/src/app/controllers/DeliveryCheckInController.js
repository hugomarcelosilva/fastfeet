import { Op } from 'sequelize';

import { object, number } from 'yup';
import { startOfDay, endOfDay } from 'date-fns';

import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';

class DeliveryCheckInController {
  async update(req, res) {
    const schema = object().shape({
      deliveryman_id: number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found. ' });
    }

    const { deliveryman_id } = req.body;

    const deliveryman = await DeliveryMan.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'DeliveryMan not found. ' });
    }

    if (delivery.deliveryman_id !== deliveryman.id) {
      return res
        .status(400)
        .json({ error: 'Delivery not registered to the DeliveryMan. ' });
    }

    const dayDeliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.body.deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
      },
    });

    if (dayDeliveries.length >= 5) {
      return res.status(401).json({
        error: 'This DeliveryMan has exceeded the limit of 5 pickups per day.',
      });
    }

    delivery.start_date = new Date();
    await delivery.save();

    return res.json(delivery);
  }
}

export default new DeliveryCheckInController();
