import { object, number, string } from 'yup';

import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class DeliveryManController {
  async index(req, res) {
    const deliveryMen = await DeliveryMan.findAll();

    return res.json(deliveryMen);
  }

  async store(req, res) {
    const schema = object().shape({
      name: string().required(),
      email: string()
        .email()
        .required(),
      avatar_id: number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { avatar_id } = req.body;

    const file = await File.findOne({
      where: { id: avatar_id },
    });

    if (!file) {
      return res.status(400).json({ error: 'File not found' });
    }

    const deliveryManExists = await DeliveryMan.findOne({
      where: { email: req.body.email },
    });

    if (deliveryManExists) {
      return res.status(401).json({ error: 'DeliveryMan already exists.' });
    }

    const deliveryMan = await DeliveryMan.create(req.body);

    return res.json(deliveryMan);
  }

  async update(req, res) {
    const schema = object().shape({
      name: string().required(),
      email: string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const deliveryManExists = await DeliveryMan.findByPk(id);

    if (!deliveryManExists) {
      return res.status(400).json({ error: 'DeliveryMan not found.' });
    }

    const { email } = req.body;

    if (email && email !== deliveryManExists.email) {
      const emailAlreadyExists = await DeliveryMan.findOne({
        where: { email },
      });

      if (emailAlreadyExists) {
        return res.status(401).json({ error: 'DeliveryMan already exists.' });
      }
    }

    await deliveryManExists.update(req.body);

    const { name, avatar } = await DeliveryMan.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryManExists = await DeliveryMan.findByPk(id);

    if (!deliveryManExists) {
      return res.status(400).json({ error: 'DeliveryMan not found' });
    }

    await deliveryManExists.destroy(id);

    return res.status(204).send();
  }
}

export default new DeliveryManController();
