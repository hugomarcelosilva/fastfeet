import React from 'react';

import PropTypes from 'prop-types';

import Modal from '~/components/Modal';

import { Container } from './styles';

export default function DeliveryModal({ data }) {
  const { street, number, city, state, zip_code } = data.recipient;

  return (
    <Modal>
      <Container>
        <div>
          <strong>Informações da encomenda</strong>
          <small>
            {street}, {number}
          </small>
          <small>
            {city} - {state}
          </small>
          <small>CEP {zip_code}</small>
        </div>
        {data.start_dateFormatted ? (
          <div>
            <strong>Datas</strong>
            <div>
              <span>Retirada: </span>
              <small>{data.start_dateFormatted}</small>
            </div>
            {data.end_dateFormatted ? (
              <div>
                <span>Entrega: </span>
                <small>{data.end_dateFormatted}</small>
              </div>
            ) : null}
            {data.canceled_dateFormatted ? (
              <div>
                <span>Cancelamento: </span>
                <small>{data.canceled_dateFormatted}</small>
              </div>
            ) : null}
          </div>
        ) : null}
        {data.signature ? (
          <div style={{ paddingBottom: '25px' }}>
            <strong>Assinatura do destinatário</strong>
            <img src={data.signature.url} alt="signature" />
          </div>
        ) : null}
      </Container>
    </Modal>
  );
}

DeliveryModal.propTypes = {
  data: PropTypes.shape({
    start_dateFormatted: PropTypes.string,
    end_dateFormatted: PropTypes.string,
    canceled_dateFormatted: PropTypes.string,
    recipient: PropTypes.shape({
      name: PropTypes.string,
      street: PropTypes.string,
      number: PropTypes.number,
      city: PropTypes.string,
      state: PropTypes.string,
      zip_code: PropTypes.string,
    }),
    status: PropTypes.string,
    signature: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};
