import styled, { css } from 'styled-components';

import { SimpleButton } from '~/components/utils/Button';

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
    padding-left: 25px;
    padding-right: 13px;
    ${props =>
      props.null
        ? css`
            display: flex;
            justify-content: space-around;
            grid-template-columns: 1fr;
          `
        : css`
            display: grid;
            grid-template-columns: 1fr 2fr 0.5fr;
          `}
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

export const Button = styled(SimpleButton)`
  width: 100px;
  height: 36px;
  &:disabled {
    cursor: not-allowed;
    background: ${colors.darkGray};
  }
`;
