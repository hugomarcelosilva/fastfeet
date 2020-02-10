import Mail from '../../lib/Mail';

class DeliveryCancelMail {
  get key() {
    return 'DeliveryCancelMail';
  }

  async handle({ data }) {
    const { delivery, problem, startDate, endDate } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Cancelamento de entrega',
      template: 'cancellation',
      context: {
        product: delivery.product,
        delivery_man: delivery.deliveryman.name,
        description: problem.description,
        startDate,
        endDate,
      },
    });
  }
}

export default new DeliveryCancelMail();
