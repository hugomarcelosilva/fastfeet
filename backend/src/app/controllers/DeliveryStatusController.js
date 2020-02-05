import { Op } from 'sequelize';
import { object, date } from 'yup';
import { startOfDay, endOfDay } from 'date-fns';

import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class DeliveryStatusController {
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

  async update(req, res) {
    const schema = object().shape({
      start_date: date(),
      end_date: date(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const deliveryman = await DeliveryMan.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'DeliveryMan not found. ' });
    }

    const { deliveryId } = req.query;

    const delivery = await Delivery.findByPk(deliveryId);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found. ' });
    }

    if (delivery.deliveryman_id !== deliveryman.id) {
      return res
        .status(400)
        .json({ error: 'Delivery not registered to the DeliveryMan. ' });
    }

    const { start_date, end_date } = req.query;

    if (!start_date && !end_date) {
      return res
        .status(400)
        .json({ error: 'Start date or end date need to be provided.' });
    }

    if (end_date) {
      const { originalname: name, filename: path } = req.file;

      const { id: signature_id } = await File.create({
        name,
        path,
      });

      const { product, recipient_id } = await delivery.update({
        end_date,
        signature_id,
      });

      return res.json({
        product,
        recipient_id,
        signature_id,
        end_date,
      });
    }

    const dayDeliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
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

    const { product, recipient_id } = await delivery.update({
      start_date,
    });

    return res.json({
      product,
      recipient_id,
      start_date,
    });
  }
}

export default new DeliveryStatusController();
