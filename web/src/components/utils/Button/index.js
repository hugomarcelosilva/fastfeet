import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

import history from '~/services/history';

import IconButton from './IconButton';

import { colors } from '~/styles/colors';

export const SimpleButton = styled.button`
  background: ${colors.primary};
  color: ${colors.white};
  font-size: 16px;
  font-weight: bold;
  height: 45px;
  border-radius: 4px;
`;

export function SaveButton({ action }) {
  return <IconButton title="SALVAR" Icon={MdDone} action={action} />;
}

export function BackButton() {
  return (
    <IconButton
      title="VOLTAR"
      Icon={MdKeyboardArrowLeft}
      action={history.goBack}
      background="#CCC"
    />
  );
}

SaveButton.propTypes = {
  action: PropTypes.func.isRequired,
};
