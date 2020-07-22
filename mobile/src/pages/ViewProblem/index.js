import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  ProductTitle,
  ProblemList,
  ProblemTitle,
  ProblemDate,
} from './styles';

export default function ViewProblem() {
  const route = useRoute();
  const [problems, setProblems] = useState([]);
  const { delivery_id, product_name } = route.params;

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`/delivery/${delivery_id}/problems`);
      setProblems(response.data);
    }

    loadProblems();
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <ProductTitle>{product_name}</ProductTitle>
        <ScrollView>
          {problems.map((problem) => (
            <ProblemList key={problem.id}>
              <ProblemTitle>{problem.description}</ProblemTitle>
              <ProblemDate>
                {format(parseISO(problem.createdAt), 'dd/MM/yyyy')}
              </ProblemDate>
            </ProblemList>
          ))}
        </ScrollView>
      </Content>
    </Container>
  );
}
