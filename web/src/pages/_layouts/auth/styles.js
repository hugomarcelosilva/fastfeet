import styled from 'styled-components';
import { darken } from 'polished';

import { colors } from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: ${colors.white};
  border-radius: 4px;
  padding: 60px 30px;
  img {
    width: 100%;
    height: 100%;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    input {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: ${colors.darkGray};
      margin: 0 0 10px;
      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }
    label {
      color: ${colors.darkGray};
      align-self: flex-start;
      margin: 10px 0;
      text-transform: uppercase;
      font-weight: bold;
    }
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      background: ${colors.secondary};
      font-weight: bold;
      color: ${colors.white};
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.1, colors.secondary)};
      }
    }
  }
`;
