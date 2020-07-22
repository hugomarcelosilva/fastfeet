import styled from 'styled-components';

import { colors } from '~/styles/colors';

export const Container = styled.div`
  h1 {
    font-size: 24px;
    font-weight: bold;
    color: ${colors.darkGray};
    margin-bottom: 35px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;
