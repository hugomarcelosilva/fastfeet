import React, { useEffect, useState } from 'react';
import {
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdBlock,
  MdCached,
  MdError,
} from 'react-icons/md';

import IconButton from '~/components/utils/Button/IconButton';
import SearchInput from '~/components/Form/SearchInput';
import HeaderList from '~/components/HeaderList';
import api from '~/services/api';
import history from '~/services/history';

import { colors } from '~/styles/colors';

import DeliverymanItem from './DeliveryManItem';
import { Container, Content, Grid } from './styles';
import {
  ButtonSection,
  EmptyField,
  Button,
  LoadingField,
} from '~/styles/fields';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadDeliverymen() {
    setLoading(true);
    try {
      const response = await api.get('/deliverymen', {
        params: {
          page,
        },
      });

      setDeliverymen(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDeliverymen();
  }, [page]);

  async function handleSearchDeliveryman(e) {
    setPage(1);
    setLoading(true);

    try {
      const response = await api.get('/deliverymen', {
        params: {
          deliverymanName: e.target.value,
          page,
        },
      });

      setDeliverymen(response.data);
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
          <HeaderList title="Gerenciando entregadores">
            <SearchInput
              onChange={handleSearchDeliveryman}
              type="text"
              placeholder="Buscar por entregadores"
            />
            <IconButton
              Icon={MdAdd}
              title="CADASTRAR"
              action={() => history.push('/deliverymen/create')}
              type="button"
            />
          </HeaderList>

          <Grid null={!deliverymen.length > 0}>
            <section>
              <strong>ID</strong>
              <strong>Foto</strong>
              <strong>Nome</strong>
              <strong>Email</strong>
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
              disabled={deliverymen.length < 5}
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
          <HeaderList title="Gerenciando entregadores">
            <SearchInput
              onChange={handleSearchDeliveryman}
              type="text"
              placeholder="Buscar por entregadores"
            />
            <IconButton
              Icon={MdAdd}
              title="CADASTRAR"
              action={() => history.push('/deliverymen/create')}
              type="button"
            />
          </HeaderList>

          <Grid null={!deliverymen.length > 0}>
            <section>
              <strong>ID</strong>
              <strong>Foto</strong>
              <strong>Nome</strong>
              <strong>Email</strong>
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
              disabled={deliverymen.length < 5}
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
        <HeaderList title="Gerenciando entregadores">
          <SearchInput
            onChange={handleSearchDeliveryman}
            type="text"
            placeholder="Buscar por entregadores"
          />
          <IconButton
            Icon={MdAdd}
            title="CADASTRAR"
            action={() => history.push('/deliverymen/create')}
            type="button"
          />
        </HeaderList>

        <Grid null={!deliverymen.length > 0}>
          <section>
            <strong>ID</strong>
            <strong>Foto</strong>
            <strong>Nome</strong>
            <strong>Email</strong>
            <strong>Ações</strong>
          </section>
          {deliverymen.length > 0 ? (
            deliverymen.map(deliveryman => (
              <DeliverymanItem
                key={deliveryman.id}
                data={deliveryman}
                updateDeliveryman={loadDeliverymen}
              />
            ))
          ) : (
            <EmptyField>
              <MdBlock size={86} color={colors.primary} />
              <span>Não há entregadores</span>
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
            disabled={deliverymen.length < 5}
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
