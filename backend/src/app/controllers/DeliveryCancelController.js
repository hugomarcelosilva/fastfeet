import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Queue from '../../lib/Queue';
import DeliveryCancelMail from '../jobs/DeliveryCancelMail';
import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryCancelController {
  async destroy(req, res) {
    const { id } = req.params;

    const deliveryProblemExists = await DeliveryProblem.findOne({
      where: { id },
    });

    if (!deliveryProblemExists) {
      return res.status(400).json({ error: 'DeliveryProblem not found.' });
    }

    const delivery = await Delivery.findByPk(
      deliveryProblemExists.delivery_id,
      {
        include: [
          {
            model: DeliveryMan,
            as: 'deliveryman',
            attributes: ['id', 'name', 'email'],
          },
        ],
      }
    );

    if (delivery.end_date !== null && delivery.signature_id !== null) {
      return res
        .status(401)
        .json({ error: "This delivery it's already completed" });
    }

    await delivery.update({
      canceled_at: new Date(),
    });

    const startDate = delivery.start_date
      ? format(
          parseISO(delivery.start_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          { locale: pt }
        )
      : 'Não informada';

    const endDate = delivery.end_date
      ? format(
          parseISO(delivery.end_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          { locale: pt }
        )
      : 'Não informada';

    await Queue.add(DeliveryCancelMail.key, {
      delivery,
      problem: deliveryProblemExists,
      startDate,
      endDate,
    });

    return res.status(204).send();
  }
}

export default new DeliveryCancelController();
