import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import Popup from 'reactjs-popup';

import PropTypes from 'prop-types';

import { Button } from './styles';

export default function More({ children, ...rest }) {
  return (
    <Popup
      trigger={
        <Button type="button">
          <MdMoreHoriz color="#C6C6C6" size={25} />
        </Button>
      }
      position="bottom center"
      contentStyle={{
        width: '150px',
        borderRadius: '4px',
      }}
      {...rest}
    >
      {children}
    </Popup>
  );
}

More.propTypes = {
  children: PropTypes.element.isRequired,
};
