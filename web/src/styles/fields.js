import styled, { keyframes } from 'styled-components';

import { colors, statusColors } from '~/styles/colors';

import { SimpleButton } from '~/components/utils/Button';

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

export const ButtonSection = styled.section`
  margin: 30px 0;
`;

export const EmptyField = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  svg {
    margin-top: 40px;
  }
  span {
    font-weight: bold;
    font-size: 16px;
    margin-top: 10px;
    color: ${colors.primary};
  }
`;

export const LoadingField = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  svg {
    margin-top: 40px;
    animation: ${rotate} 2s linear infinite;
  }
  span {
    font-weight: bold;
    font-size: 16px;
    margin-top: 10px;
    color: ${colors.primary};
  }
`;

export const Button = styled(SimpleButton)`
  width: 100px;
  height: 36px;
  background: ${colors.primary};
  border: 0;
  color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 14px;
  }
  &:disabled {
    cursor: not-allowed;
    background: ${statusColors.DISABLED.background};
    color: ${statusColors.DISABLED.color};
  }
`;
