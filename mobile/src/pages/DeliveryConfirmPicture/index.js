import React, { useRef, useState } from 'react';
import { Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import { useNavigation, useRoute } from '@react-navigation/native';

import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  CameraWrapper,
  Camera,
  Button,
  TakePictureButton,
} from './styles';

export default function DeliveryConfirmPicture() {
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const route = useRoute();

  let cameraRef = useRef(null);
  const [pictureUri, setPictureUri] = useState('');

  async function handleSubmit() {
    try {
      const dataFile = new FormData();

      dataFile.append('file', {
        type: 'image/jpg',
        uri: pictureUri,
        name: 'assignature.jpg',
      });

      const pictureResponse = await api.post('/files', dataFile);

      await api.put(
        `/deliveryman/${auth.id}/deliveries/${route.params.delivery_id}/checkout`,
        {
          signature_id: pictureResponse.data.id,
          end: true,
        }
      );

      Alert.alert('Sucesso', 'Entrega finalizada com sucesso.');

      navigation.navigate('Entregas');
    } catch (err) {
      Alert.alert(
        'Erro',
        'Houve um erro ao carregar a assinatura. Por favor, tente novamente.'
      );
    }
  }

  async function handletakePicture() {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      await setPictureUri(data.uri);
    }
  }

  return (
    <Container>
      <Background />
      <Content>
        {pictureUri ? (
          <CameraWrapper>
            <Image source={{ uri: pictureUri }} style={{ height: '100%' }} />
          </CameraWrapper>
        ) : (
          <CameraWrapper>
            <Camera ref={cameraRef} type="back" captureAudio={false} />
            <TakePictureButton onPress={handletakePicture}>
              <Icon name="photo-camera" color="#fff" size={30} />
            </TakePictureButton>
          </CameraWrapper>
        )}
        <Button onPress={handleSubmit} loading={false}>
          Enviar
        </Button>
      </Content>
    </Container>
  );
}
