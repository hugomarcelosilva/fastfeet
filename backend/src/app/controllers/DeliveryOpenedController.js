import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';

class DeliveryClosedController {
  async index(req, res) {
    const { id } = req.params;

    const deliveryman = await DeliveryMan.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found. ' });
    }

    const { page = 1, end } = req.query;

    if (end) {
      const deliveries = await Delivery.findAll({
        where: {
          deliveryman_id: id,
          end_date: {
            [Op.not]: null,
          },
          canceled_at: null,
        },
        attributes: [
          'id',
          'product',
          'start_date',
          'end_date',
          'recipient_id',
          'status',
        ],
        include: {
          model: Recipient,
          as: 'recipient',
          paranoid: false,
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'city',
            'state',
            'zip_code',
          ],
        },
        limit: 10,
        offset: (page - 1) * 10,
      });

      return res.json(deliveries);
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        end_date: null,
        canceled_at: null,
      },
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'recipient_id',
        'status',
      ],
      include: {
        model: Recipient,
        as: 'recipient',
        paranoid: false,
        attributes: [
          'id',
          'name',
          'street',
          'number',
          'complement',
          'city',
          'state',
          'zip_code',
        ],
      },
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(deliveries);
  }
}

export default new DeliveryClosedController();
