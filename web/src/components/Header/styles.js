import styled from 'styled-components';

import { colors } from '~/styles/colors';

export const Container = styled.div`
  background: ${colors.white};
  padding: 0 30px;
  border-bottom: 1px solid ${colors.lightGray};
  margin-bottom: 35px;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  nav {
    display: flex;
    align-items: center;
    img {
      width: 135px;
      height: 26px;
      margin-right: 30px;
    }
  }
  aside {
    display: flex;
    align-items: center;
  }
`;

export const Navigation = styled.div`
  padding-left: 30px;
  height: 32px;
  border-left: 1px solid ${colors.lightGray};
  display: flex;
  align-items: center;
  a {
    margin-right: 20px;
    font-size: 15px;
    font-weight: bold;
    color: ${colors.gray};
    transition: color 0.2s;
    &:hover {
      color: ${colors.primary};
    }
    &.active {
      color: ${colors.darkGray};
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  strong {
    font-weight: bold;
    color: ${colors.darkGray};
    margin-bottom: 5px;
  }
  button {
    border: 0;
    background: none;
    color: ${colors.danger};
    transition: color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      color: ${colors.primary};
    }
    svg {
      margin-left: 5px;
    }
  }
`;
