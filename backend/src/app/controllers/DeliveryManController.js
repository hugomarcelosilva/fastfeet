import { object, number, string } from 'yup';
import { Op } from 'sequelize';

import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class DeliveryManController {
  async index(req, res) {
    const { deliverymanName, deliverymanId } = req.query;

    if (deliverymanName) {
      const deliveryman = await DeliveryMan.findAll({
        where: {
          name: {
            [Op.iLike]: `%${deliverymanName}%`,
          },
        },
        order: [['id', 'DESC']],
        attributes: ['id', 'name', 'email', 'avatar_id'],
        include: {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      });

      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman does not found.' });
      }

      return res.json(deliveryman);
    }

    if (deliverymanId) {
      const deliveryman = await DeliveryMan.findOne({
        where: {
          id: deliverymanId,
        },
        order: [['id', 'DESC']],
        attributes: ['id', 'name', 'email', 'avatar_id', 'created_at'],
        include: {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      });

      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman does not found.' });
      }

      return res.json(deliveryman);
    }

    const deliveryMen = await DeliveryMan.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      order: [['id', 'DESC']],
      include: {
        model: File,
        as: 'avatar',
        attributes: ['name', 'path', 'url'],
      },
    });

    return res.json(deliveryMen);
  }

  async store(req, res) {
    const schema = object().shape({
      name: string().required(),
      email: string()
        .email()
        .required(),
      avatar_id: number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { avatar_id, email } = req.body;

    const file = await File.findOne({
      where: { id: avatar_id },
    });

    if (!file) {
      return res.status(400).json({ error: 'File not found' });
    }

    const deliveryManExists = await DeliveryMan.findOne({
      where: { email },
    });

    if (deliveryManExists) {
      return res.status(401).json({ error: 'DeliveryMan already exists.' });
    }

    const deliveryMan = await DeliveryMan.create(req.body);

    return res.json(deliveryMan);
  }

  async update(req, res) {
    const schema = object().shape({
      name: string(),
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

    await deliveryManExists.destroy();

    const allDeliverymen = await DeliveryMan.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
    });

    return res.json(allDeliverymen);
  }
}

export default new DeliveryManController();
