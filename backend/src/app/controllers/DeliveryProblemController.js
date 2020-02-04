import { object, string } from 'yup';

import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  async index(req, res) {
    const { id } = req.params;

    const deliveryExists = await Delivery.findByPk(id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    const deliveryProblems = await DeliveryProblem.findAll();

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const schema = object().shape({
      description: string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const deliveryExists = await Delivery.findByPk(id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    const deliveryProblem = await DeliveryProblem.create(req.body);

    return res.json(deliveryProblem);
  }
}

export default new DeliveryProblemController();
