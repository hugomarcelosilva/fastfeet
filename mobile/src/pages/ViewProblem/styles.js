import styled from 'styled-components/native';

import colors from '~/styles/colors';

import Text from '~/components/Text';

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;

export const Background = styled.View`
  background: ${colors.primary};
  height: 155px;
`;
export const Content = styled.View`
  margin-top: -60px;
  padding: 0 20px;
`;

export const ProductTitle = styled(Text)`
  margin-top: -20px;
  font-weight: bold;
  color: #fff;
  font-size: 20px;
  align-self: center;
`;

export const ProblemList = styled.View`
  height: auto;
  min-height: 60px;
  font-size: 16px;
  background: #fff;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  margin-top: 20px;
  align-items: center;
  border: 1px solid #0000001a;
  border-radius: 4px;
`;

export const ProblemTitle = styled(Text)`
  color: #a5a5a5;
  font-size: 16px;
`;

export const ProblemDate = styled(Text)`
  color: #a5a5a5;
  font-size: 12px;
`;
