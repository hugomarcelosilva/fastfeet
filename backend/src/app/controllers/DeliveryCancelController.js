import { object, date } from 'yup';

import Queue from '../../lib/Queue';
import DeliveryCancelMail from '../jobs/DeliveryCancelMail';
import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryCancelController {
  async store(req, res) {
    const schema = object().shape({
      canceled_at: date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const problem = await DeliveryProblem.findByPk(id);

    if (!problem) {
      return res
        .status(400)
        .json({ error: 'Delivery problem does not found.' });
    }

    const { delivery_id } = problem;

    const delivery = await Delivery.findOne({
      id: delivery_id,
    });

    if (!delivery) {
      return res
        .status(400)
        .json({ error: 'A delivery referred to this problem are not found' });
    }

    const { canceled_at } = req.body;

    const {
      product,
      start_date,
      recipient_id,
      deliveryman_id,
    } = await delivery.update({
      canceled_at: canceled_at || new Date(),
      end_date: null,
      status: 'CANCELED',
    });

    const deliveryman = await DeliveryMan.findOne({
      where: {
        id: deliveryman_id,
      },
    });

    await Queue.add(DeliveryCancelMail.key, {
      deliveryman,
      product,
      problem: problem.description,
      canceled_at: canceled_at || new Date(),
    });

    return res.json({
      id,
      delivery_id,
      product,
      start_date,
      canceled_at,
      recipient_id,
      deliveryman_id,
    });
  }
}

export default new DeliveryCancelController();
