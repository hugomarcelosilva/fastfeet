import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import CreateProblem from '~/pages/CreateProblem';
import ViewProblem from '~/pages/ViewProblem';
import Deliveries from '~/pages/Deliveries';
import DeliveryConfirmPicture from '~/pages/DeliveryConfirmPicture';
import DeliveryDetails from '~/pages/DeliveryDetails';

const Stack = createStackNavigator();

export default function DeliveryRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: '#fff',
        headerTransparent: true,
      }}
      initialRouteName="Entregas">
      <Stack.Screen
        options={{headerShown: false}}
        name="Entregas"
        component={Deliveries}
      />
      <Stack.Screen
        name="Detalhes"
        options={{
          title: 'Detalhes da Encomenda',
        }}
        component={DeliveryDetails}
      />
      <Stack.Screen
        name="ConfirmPicture"
        options={{
          title: 'Confirmar Entrega',
        }}
        component={DeliveryConfirmPicture}
      />
      <Stack.Screen
        name="CreateProblem"
        options={{
          title: 'Informar Problema',
        }}
        component={CreateProblem}
      />
      <Stack.Screen
        name="ViewProblem"
        options={{
          title: 'Visualizar Problemas',
        }}
        component={ViewProblem}
      />
    </Stack.Navigator>
  );
}
