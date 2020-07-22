/* eslint-disable no-alert */
import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import More from '~/components/utils/More';
import api from '~/services/api';
import history from '~/services/history';
import { colors } from '~/styles/colors';

import { Container, MoreConainer } from './styles';

export default function RecipientItem({ data, updateRecipients }) {
  async function handleDelete() {
    const confirm = window.confirm(
      'Você tem certeza que deseja deletar este destinatário?'
    );

    if (!confirm) {
      toast.warning('Destinatário não removido.');
      return;
    }

    try {
      await api.delete(`/recipients/${data.id}`);
      updateRecipients();
      toast.success('Destinatário removido com sucesso.');
    } catch (err) {
      toast.error(
        'Esse destinatário não pode ser apagado, pois ainda tem ao menos uma encomenda a ser entregue.'
      );
    }
  }

  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.name}</small>
      <small>
        {data.street}, {data.number}, {data.city} - {data.state}
      </small>
      <More>
        <MoreConainer>
          <div>
            <button
              onClick={() => history.push(`/recipients/update/${data.id}`)}
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

RecipientItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
  updateRecipients: PropTypes.func.isRequired,
};
