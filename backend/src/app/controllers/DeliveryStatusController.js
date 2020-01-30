import { Op } from 'sequelize';
import * as Yup from 'yup';
import { startOfDay } from 'date-fns';

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
    const schema = Yup.object().shape({
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    /**
     * Deliveryman verifier
     */

    const deliveryman = await DeliveryMan.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'DeliveryMan not found. ' });
    }

    /**
     * Delivery verifier
     */

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

    /**
     * Signature verifier if deliveryman try to update with end date
     */

    const { end_date } = req.query;

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

    /**
     * Pickups per day verifier
     */

    const today = new Date();
    const thisToday = startOfDay(today);

    const dayDeliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        start_date: {
          [Op.between]: [thisToday, today],
        },
      },
    });

    if (dayDeliveries.length >= 5) {
      return res.status(400).json({
        error: 'This DeliveryMan has exceeded the limit of 5 pickups per day.',
      });
    }

    /**
     * End of verifications and start of update method
     */

    const { start_date } = req.query;

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
