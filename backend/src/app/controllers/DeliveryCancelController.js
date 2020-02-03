import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';

import DeliveryCancelMail from '../jobs/DeliveryCancelMail';
import Queue from '../../lib/Queue';

class DeliveryCancelController {
  async store(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    await delivery.update({
      canceled_at: new Date(),
    });

    await Queue.add(DeliveryCancelMail.key, {
      delivery,
    });

    return res.json(delivery);
  }
}

export default new DeliveryCancelController();
