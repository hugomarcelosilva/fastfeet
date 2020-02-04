import { object, number, string } from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();

    return res.json(recipients);
  }

  async store(req, res) {
    const schema = object().shape({
      name: string().required(),
      street: string().required(),
      number: number().required(),
      complement: string(),
      state: string().required(),
      city: string().required(),
      zip_code: string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists) {
      return res.status(401).json({ error: 'Recipient already exists.' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = object().shape({
      name: string().required(),
      street: string(),
      number: number(),
      complement: string(),
      state: string(),
      city: string(),
      zip_code: string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const recipientExists = await Recipient.findByPk(id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }

    const recipient = await recipientExists.update(req.body);

    return res.json(recipient);
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipientExists = await Recipient.findByPk(id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    await recipientExists.destroy(id);

    return res.status(204).send();
  }
}

export default new RecipientController();
