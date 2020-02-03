import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { delivery_man, delivery } = data;

    await Mail.sendMail({
      to: `${delivery_man.name} <${delivery_man.email}>`,
      subject: 'Nova Encomenda',
      template: 'delivery',
      context: {
        id: delivery_man.id,
        delivery_man: delivery_man.name,
        product: delivery.product,
        delivery_id: delivery.id,
      },
    });
  }
}

export default new DeliveryMail();
