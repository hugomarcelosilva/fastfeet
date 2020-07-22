/* eslint-disable no-alert */
import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import More from '~/components/utils/More';
import api from '~/services/api';
import history from '~/services/history';
import { statusColors, colors } from '~/styles/colors';

import DeliveryModal from '../Modal';
import Status from './DeliveryStatus';
import { Container, List, MoreConainer, DeliverymanAvatar } from './styles';

import translateStatus from '~/utils/translateStatus';
import getInitials from '~/utils/getInitials';

export default function DeliveryItem({ data, updateDeliveries }) {
  async function handleDelete() {
    const confirm = window.confirm(
      'Você realmente deseja excluir esta encomenda?'
    );

    if (!confirm) {
      toast.warning(`A encomenda "${data.product}" não foi removida.`);
      return;
    }

    try {
      await api.delete(`/deliveries/${data.id}`);
      updateDeliveries();
      toast.success(`Encomenda "${data.product}" removida com sucesso.`);
    } catch (err) {
      toast.error('Essa encomenda não pôde ser deletada.');
    }
  }

  return (
    <Container>
      <List>#{data.id}</List>
      <List>{data.recipient.name}</List>
      <List>
        <DeliverymanAvatar
          background={statusColors[data.status].background}
          textColor={statusColors[data.status].color}
          hasAvatar={!!data.deliveryman.avatar}
        >
          {data.deliveryman.avatar ? (
            <img
              src={data.deliveryman.avatar.url}
              alt={data.deliveryman.name}
            />
          ) : (
            <span>{getInitials(data.deliveryman.name)}</span>
          )}
        </DeliverymanAvatar>
        {data.deliveryman.name}
      </List>
      <List>{data.recipient.city}</List>
      <List>{data.recipient.state}</List>
      <Status
        text={translateStatus(data.status)}
        color={statusColors[data.status].color}
        background={statusColors[data.status].background}
      />
      <More>
        <MoreConainer>
          <div>
            <DeliveryModal data={data} />
          </div>
          <div>
            <button
              onClick={() => history.push(`/deliveries/update/${data.id}`)}
              type="button"
            >
              <MdEdit color={colors.info} size={15} />
              <span>Editar</span>
            </button>
          </div>
          <div>
            <button onClick={handleDelete} type="button">
              <MdDeleteForever color={colors.danger} size={15} />
              <span>Excluir</span>
            </button>
          </div>
        </MoreConainer>
      </More>
    </Container>
  );
}

DeliveryItem.propTypes = {
  updateDeliveries: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    deliveryman: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    product: PropTypes.string,
    recipient: PropTypes.shape({
      name: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    status: PropTypes.string,
  }).isRequired,
};
