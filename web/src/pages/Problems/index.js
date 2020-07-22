import React, { useState, useEffect } from 'react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdBlock,
  MdCached,
  MdError,
} from 'react-icons/md';

import api from '~/services/api';

import HeaderList from '~/components/HeaderList';
import ProblemItem from './ProblemItem';
import { Container, Content, Grid } from './styles';
import {
  ButtonSection,
  EmptyField,
  Button,
  LoadingField,
} from '~/styles/fields';
import { colors } from '~/styles/colors';

export default function Problems() {
  const [page, setPage] = useState(1);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadProblems() {
    setLoading(true);
    try {
      const response = await api.get('/problems', {
        params: {
          page,
        },
      });

      setProblems(response.data);

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProblems();
  }, [page]);

  if (loading) {
    return (
      <Container>
        <Content>
          <HeaderList title="Problemas na entrega" />
          <Grid null={!problems.length > 0}>
            <section>
              <strong>Encomenda</strong>
              <strong>Problema</strong>
              <strong>Ações</strong>
            </section>
            <LoadingField>
              <MdCached size={86} color={colors.primary} />
              <span>Carregando...</span>
            </LoadingField>
          </Grid>
          <ButtonSection>
            <Button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              type="button"
            >
              <MdChevronLeft size={26} />{' '}
              <span style={{ marginRight: 5 }}>Voltar</span>
            </Button>
            <Button
              disabled={problems.length < 5}
              type="button"
              onClick={() => setPage(page + 1)}
            >
              <span style={{ marginLeft: 5 }}>Próximo</span>
              <MdChevronRight size={26} />
            </Button>
          </ButtonSection>
        </Content>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Content>
          <HeaderList title="Problemas na entrega" />
          <Grid null={!problems.length > 0}>
            <section>
              <strong>Encomenda</strong>
              <strong>Problema</strong>
              <strong>Ações</strong>
            </section>
            <EmptyField>
              <MdError size={86} color={colors.primary} />
              <span>
                Erro ao carregar, por favor tente novamente mais tarde.
              </span>
            </EmptyField>
          </Grid>
          <ButtonSection>
            <Button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              type="button"
            >
              <MdChevronLeft size={26} />{' '}
              <span style={{ marginRight: 5 }}>Voltar</span>
            </Button>
            <Button
              disabled={problems.length < 5}
              type="button"
              onClick={() => setPage(page + 1)}
            >
              <span style={{ marginLeft: 5 }}>Próximo</span>
              <MdChevronRight size={26} />
            </Button>
          </ButtonSection>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <HeaderList title="Problemas na entrega" />
        <Grid null={!problems.length > 0}>
          <section>
            <strong>Encomenda</strong>
            <strong>Problema</strong>
            <strong>Ações</strong>
          </section>
          {problems.length > 0 ? (
            problems.map(problem => (
              <ProblemItem
                updateProblems={loadProblems}
                key={problem.id}
                data={problem}
              />
            ))
          ) : (
            <EmptyField>
              <MdBlock size={86} color={colors.primary} />
              <span>Não há entregas com problemas.</span>
            </EmptyField>
          )}
        </Grid>
        <ButtonSection>
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            type="button"
          >
            <MdChevronLeft size={26} />{' '}
            <span style={{ marginRight: 5 }}>Voltar</span>
          </Button>
          <Button
            disabled={problems.length < 5}
            type="button"
            onClick={() => setPage(page + 1)}
          >
            <span style={{ marginLeft: 5 }}>Próximo</span>
            <MdChevronRight size={26} />
          </Button>
        </ButtonSection>
      </Content>
    </Container>
  );
}
