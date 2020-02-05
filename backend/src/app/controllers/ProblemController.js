import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';

class ProblemController {
  async index(req, res) {
    const deliveryProblems = await DeliveryProblem.findAll({
      include: {
        model: Delivery,
        as: 'delivery',
        attributes: ['id', 'product'],
      },
    });

    return res.json(deliveryProblems);
  }
}

export default new ProblemController();
