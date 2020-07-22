import { object, string } from 'yup';

import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  async index(req, res) {
    const { id } = req.params;

    if (id) {
      /**
       * List all problems from a delivery based on id of this
       */

      const problemsInDelivery = await DeliveryProblem.findAll({
        where: {
          delivery_id: id,
        },
        order: [['id', 'DESC']],
        attributes: ['id', 'description', 'createdAt'],
      });

      if (problemsInDelivery.length === 0) {
        return res.status(400).json({ error: 'This delivery has no problem.' });
      }

      return res.json(problemsInDelivery);
    }

    const problems = await DeliveryProblem.findAll({
      attributes: ['id', 'description', 'delivery_id'],
      order: [['id', 'DESC']],
    });

    return res.json(problems);
  }

  async store(req, res) {
    const schema = object().shape({
      description: string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const { description } = req.body;

    /**
     * Delivery validator
     */

    const deliveryExists = await Delivery.findByPk(id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: id,
      description,
    });

    return res.json(deliveryProblem);
  }
}

export default new DeliveryProblemController();
