import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { delivery_man, delivery } = data;

    await Mail.sendMail({
      to: `${delivery_man.name} <${delivery_man.email}>`,
      subject: 'Encomenda cadastrada',
      template: 'delivery',
      context: {
        id: delivery.id,
        product: delivery.product,
      },
    });
  }
}

export default new DeliveryMail();
