import styled, { css } from 'styled-components';

import { colors } from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 120px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  > section {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
`;

export const Grid = styled.div`
  > section {
    ${props =>
      props.null
        ? css`
            display: flex;
            justify-content: space-around;
            grid-template-columns: 1fr;
          `
        : css`
            display: grid;
            grid-template-columns: 0.5fr 1.5fr 2fr 0.5fr;
          `}
    padding-left: 25px;
    padding-right: 13px;
    strong:last-child {
      text-align: right;
    }
    strong {
      font-size: 16px;
      color: ${colors.darkGray};
    }
    margin-bottom: 15px;
  }
  > div + div {
    margin-top: 20px;
  }
`;
