import { object, number as YupNumber, string } from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { recipientName, recipientId } = req.query;

    if (recipientName) {
      const recipient = await Recipient.findAll({
        where: {
          name: {
            [Op.iLike]: `%${recipientName}%`,
          },
        },
        order: [['id', 'DESC']],
        attributes: [
          'id',
          'name',
          'street',
          'number',
          'complement',
          'state',
          'city',
          'zip_code',
        ],
      });

      if (!recipient) {
        return res.status(400).json({ error: 'Recipient not found.' });
      }

      return res.json(recipient);
    }

    if (recipientId) {
      const recipient = await Recipient.findOne({
        where: {
          id: recipientId,
        },
        order: [['id', 'DESC']],
        attributes: [
          'id',
          'name',
          'street',
          'number',
          'complement',
          'state',
          'city',
          'zip_code',
        ],
      });

      if (!recipient) {
        return res.status(400).json({ error: 'Recipient not found.' });
      }

      return res.json({
        recipient,
      });
    }

    const recipients = await Recipient.findAll({
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
        'zip_code',
      ],
    });

    return res.json(recipients);
  }

  async store(req, res) {
    const schema = object().shape({
      name: string().required(),
      street: string().required(),
      number: YupNumber().required(),
      complement: string(),
      state: string().required(),
      city: string().required(),
      zip_code: string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, street, number, state, city, zip_code } = req.body;

    const recipientExists = await Recipient.findOne({
      where: { name },
    });

    if (recipientExists) {
      return res.status(401).json({ error: 'Recipient already exists.' });
    }

    await Recipient.create(req.body);

    return res.json({
      name,
      street,
      number,
      state,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = object().shape({
      name: string().required(),
      street: string().required(),
      number: YupNumber().required(),
      complement: string(),
      state: string().required(),
      city: string().required(),
      zip_code: string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const recipientExists = await Recipient.findByPk(id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }

    const { name } = req.body;

    if (name !== recipientExists.name) {
      const recipientExists = await Recipient.findOne({
        where: { name },
      });

      if (recipientExists) {
        return res
          .status(401)
          .json({ error: 'A recipient with this name already exists.' });
      }
    }

    const {
      street,
      number,
      state,
      city,
      zip_code,
    } = await recipientExists.update(req.body);

    return res.json({
      name,
      street,
      number,
      state,
      city,
      zip_code,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipientExists = await Recipient.findByPk(id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    await recipientExists.destroy();

    const recipients = await Recipient.findAll({
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
        'zip_code',
      ],
    });

    if (recipients.length === 0) {
      return res.status(200).json({
        error:
          'No one recipient was found. Please register someone and try again. ',
      });
    }

    return res.json(recipients);
  }
}

export default new RecipientController();
