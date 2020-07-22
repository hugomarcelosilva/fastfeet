/* eslint-disable no-alert */
import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import More from '~/components/utils/More';
import NamePhoto from '~/components/utils/Avatar';
import api from '~/services/api';
import history from '~/services/history';
import { colors } from '~/styles/colors';

import { Container, MoreConainer } from './styles';

export default function DeliverymanItem({ data, updateDeliveryman }) {
  async function handleDelete() {
    const confirm = window.confirm(
      'Você tem certeza que deseja remover este entregador?'
    );

    if (!confirm) {
      toast.warning('O entregador não foi removido.');
      return;
    }

    try {
      await api.delete(`/deliverymen/${data.id}`);
      updateDeliveryman();
      toast.success('Entregador apagado com sucesso!');
    } catch (err) {
      toast.error('Este entregador ainda possui encomendas a serem entregues.');
    }
  }

  return (
    <Container>
      <small>#{data.id}</small>
      {data.avatar ? (
        <img src={data?.avatar?.url} alt="AvatarUrl" />
      ) : (
        <NamePhoto name={data.name} />
      )}
      <small>{data.name}</small>
      <small>{data.email}</small>
      <More>
        <MoreConainer>
          <div>
            <button
              onClick={() => history.push(`/deliverymen/update/${data.id}`)}
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

DeliverymanItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }).isRequired,
  updateDeliveryman: PropTypes.func.isRequired,
};
