import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { delivery, delivery_man, recipient } = data;

    await Mail.sendMail({
      to: `${delivery_man.name} <${delivery_man.email}>`,
      subject: 'Detalhes da entrega',
      template: 'delivery',
      context: {
        id: delivery_man.id,
        product: delivery.product,
        delivery_man: delivery_man.name,
        recipientName: recipient.name,
        recipientStreet: recipient.street,
        recipientNumber: recipient.number,
        recipientZipCode: recipient.zip_code,
        recipientCity: recipient.city,
        recipientState: recipient.state,
        recipientComplement: recipient.complement || 'Não informado',
      },
    });
  }
}

export default new DeliveryMail();
