import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class DeliveryCancelMail {
  get key() {
    return 'DeliveryCancelMail';
  }

  async handle({ data }) {
    const { deliveryman, product, problem, canceled_at } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Cancelamento de entrega',
      template: 'cancellation',
      context: {
        delivery_man: deliveryman.name,
        product,
        problem,
        actual_date: format(new Date(), "dd' de 'MMMM' de 'yyyy", {
          locale: pt,
        }),
        canceled_at: format(parseISO(canceled_at), "dd' de 'MMMM' de 'yyyy", {
          locale: pt,
        }),
      },
    });
  }
}

export default new DeliveryCancelMail();
