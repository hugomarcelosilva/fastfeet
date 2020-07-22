import React, { useState, useEffect } from 'react';
import {
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdBlock,
  MdCached,
  MdError,
} from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { colors } from '~/styles/colors';

import IconButton from '~/components/utils/Button/IconButton';
import HeaderList from '~/components/HeaderList';
import SearchInput from '~/components/Form/SearchInput';

import RecipientItem from './RecipientItem';

import { Container, Content, Grid } from './styles';
import {
  ButtonSection,
  EmptyField,
  Button,
  LoadingField,
} from '~/styles/fields';

export default function Recipients() {
  const [page, setPage] = useState(1);
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadRecipients() {
    setLoading(true);

    try {
      const response = await api.get('/recipients', {
        params: {
          page,
        },
      });

      setRecipients(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecipients();
  }, [page]);

  async function handleSearchRecipient(e) {
    setLoading(true);
    setPage(1);

    try {
      const response = await api.get('/recipients', {
        params: {
          recipientName: e.target.value,
          page,
        },
      });

      setRecipients(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Container>
        <Content>
          <HeaderList title="Gerenciando destinatários">
            <SearchInput
              onChange={handleSearchRecipient}
              type="text"
              placeholder="Buscar por destinatários"
            />
            <IconButton
              Icon={MdAdd}
              title="CADASTRAR"
              action={() => history.push('/recipients/create')}
              type="button"
            />
          </HeaderList>
          <Grid null={!recipients.length > 0}>
            <section>
              <strong>ID</strong>
              <strong>Nome</strong>
              <strong>Endereço</strong>
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
              disabled={recipients.length < 5}
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
          <HeaderList title="Gerenciando destinatários">
            <SearchInput
              onChange={handleSearchRecipient}
              type="text"
              placeholder="Buscar por destinatários"
            />
            <IconButton
              Icon={MdAdd}
              title="CADASTRAR"
              action={() => history.push('/recipients/create')}
              type="button"
            />
          </HeaderList>
          <Grid null={!recipients.length > 0}>
            <section>
              <strong>ID</strong>
              <strong>Nome</strong>
              <strong>Endereço</strong>
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
              disabled={recipients.length < 5}
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
        <HeaderList title="Gerenciando destinatários">
          <SearchInput
            onChange={handleSearchRecipient}
            type="text"
            placeholder="Buscar por destinatários"
          />
          <IconButton
            Icon={MdAdd}
            title="CADASTRAR"
            action={() => history.push('/recipients/create')}
            type="button"
          />
        </HeaderList>
        <Grid null={!recipients.length > 0}>
          <section>
            <strong>ID</strong>
            <strong>Nome</strong>
            <strong>Endereço</strong>
            <strong>Ações</strong>
          </section>
          {recipients.length > 0 ? (
            recipients.map(recipient => (
              <RecipientItem
                updateRecipients={loadRecipients}
                key={recipient.id}
                data={recipient}
              />
            ))
          ) : (
            <EmptyField>
              <MdBlock size={86} color={colors.primary} />
              <span>Não há destinatários</span>
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
            disabled={recipients.length < 5}
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
