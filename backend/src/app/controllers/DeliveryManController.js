import { Op } from 'sequelize';
import * as Yup from 'yup';

import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class DeliveryManController {
  async index(req, res) {
    const { id } = req.query;

    if (id) {
      const deliveryManExists = await DeliveryMan.findByPk(id);

      if (!deliveryManExists) {
        return res.status(400).json({ error: 'DeliveryMan not found.' });
      }

      return res.json(deliveryManExists);
    }

    const deliveryMen = await DeliveryMan.findAll();

    return res.json(deliveryMen);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryManExists = await DeliveryMan.findOne({
      where: { email: req.body.email },
    });

    if (deliveryManExists) {
      return res.status(400).json({ error: 'DeliveryMan already exists.' });
    }

    const deliveryMan = await DeliveryMan.create(req.body);

    return res.json(deliveryMan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
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

    if (email) {
      const emailAlreadyExists = await DeliveryMan.findOne({
        where: {
          email,
          id: {
            [Op.not]: id,
          },
        },
      });

      if (emailAlreadyExists) {
        return res.status(400).json({ error: 'DeliveryMan already exists.' });
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

    return res.json();
  }
}

export default new DeliveryManController();
