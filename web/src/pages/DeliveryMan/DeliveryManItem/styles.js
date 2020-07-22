import styled from 'styled-components';

import { colors } from '~/styles/colors';

export const Container = styled.div`
  height: 57px;
  background: ${colors.white};
  border-radius: 4px;
  padding-left: 25px;
  padding-right: 13px;
  display: grid;
  grid-template-columns: 1.2fr 1.1fr 2fr 2fr 1fr;
  img {
    height: 35px;
    width: 35px;
    align-self: center;
    border-radius: 50%;
  }
  > small:last-child {
    text-align: right;
  }
  > small {
    font-size: 16px;
    color: ${colors.darkGray};
    text-align: left;
    margin: auto 0;
  }
  > section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

export const MoreConainer = styled.div`
  padding: 10px;
  > div {
    display: flex;
    align-items: center;
    button {
      background: none;
      border: none;
      display: flex;
    }
    svg {
      margin-right: 8px;
    }
    span {
      font-size: 16px;
      color: ${colors.gray};
    }
  }
  div:first-child {
    padding-bottom: 9px;
    border-bottom: 1px solid ${colors.lightGray};
  }
  div:nth-last-child(1) {
    padding-top: 9px;
  }
`;
