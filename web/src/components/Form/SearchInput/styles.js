import styled from 'styled-components';

import { colors } from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  width: 240px;
  padding: 0 16px;
  background: ${colors.white};
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  svg {
    margin-right: 8px;
  }
  input {
    width: 100%;
    font-size: 14px;
    border: 0;
    background: none;
    color: ${colors.darkGray};
    ::placeholder {
      color: ${colors.gray};
    }
  }
`;
