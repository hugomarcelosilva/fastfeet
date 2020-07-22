import styled from 'styled-components';

import { colors } from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  img {
    height: 140px;
    margin-top: 25px;
  }
  > div {
    display: flex;
    flex-direction: column;
    :nth-child(1) {
      padding-bottom: 12px;
    }
    strong {
      color: ${colors.darkGray};
      font-size: 14px;
      margin-bottom: 4px;
    }
    small {
      font-size: 16px;
      color: ${colors.darkGray};
      line-height: 25px;
    }
    > div {
      > span {
        font-size: 16px;
        font-weight: bold;
        color: ${colors.darkGray};
      }
      :nth-last-child(1) {
        margin-bottom: 10px;
      }
    }
  }
  > div + div {
    padding-top: 9px;
    border-top: 1px solid ${colors.lightGray};
  }
`;
