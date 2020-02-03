import Mail from '../../lib/Mail';

class DeliveryCancelMail {
  get key() {
    return 'DeliveryCancelMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Encomenda Cancelada',
      template: 'cancellation',
      context: {
        delivery_man: delivery.deliveryman.name,
        product: delivery.product,
        delivery_id: delivery.id,
      },
    });
  }
}

export default new DeliveryCancelMail();
