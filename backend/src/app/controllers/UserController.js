import { object, string } from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = object().shape({
      name: string().required(),
      email: string()
        .email()
        .required(),
      password: string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(401).json({ error: 'User already registered.' });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();
