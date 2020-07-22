import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, product, delivery } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Detalhes da entrega',
      template: 'delivery',
      context: {
        deliveryman: deliveryman.name,
        product,
        started: format(
          parseISO(delivery.createdAt),
          "dd' de 'MMMM' de 'yyyy",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new DeliveryMail();
