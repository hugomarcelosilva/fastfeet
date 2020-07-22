import styled from 'styled-components';

import { colors } from '~/styles/colors';

export const Container = styled.div`
  height: 57px;
  background: ${colors.white};
  border-radius: 4px;
  padding-left: 25px;
  padding-right: 13px;
  display: grid;
  grid-template-columns: 0.5fr 1.2fr 2fr 1.5fr 1fr 0.5fr 1fr;
  > small:last-child {
    text-align: right;
  }
  > section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

export const List = styled.small`
  font-size: 16px;
  color: ${colors.darkGray};
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: auto 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 75ch;
  &:last-child {
    text-align: right;
  }
`;

export const DeliverymanAvatar = styled.div`
  display: flex;
  justify-self: flex-start;
  text-transform: uppercase;
  margin-right: 8px;
  background: ${props => (props.hasAvatar ? 'transparent' : props.background)};
  padding: 3px;
  height: ${props => (props.hasAvatar ? '' : '30px')};
  width: ${props => (props.hasAvatar ? '' : '30px')};
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: center;
  }
  span {
    display: flex;
    width: 30px;
    height: 30px;
    font-size: 12px;
    color: ${props => props.textColor};
    justify-content: center;
    align-items: center;
  }
`;

export const MoreConainer = styled.div`
  padding: 10px;
  > div {
    display: flex;
    align-items: center;
    padding-bottom: 6px;
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
    :nth-last-child(-n + 2) {
      padding-top: 6px;
      border-top: 1px solid ${colors.lightGray};
    }
    :nth-last-child(1) {
      padding-bottom: 0;
    }
  }
`;
