import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Delivery from '~/pages/Delivery';
import DeliveryForm from '~/pages/Delivery/Form';

import Deliveryman from '~/pages/DeliveryMan';
import DeliverymanForm from '~/pages/DeliveryMan/Form';

import Recipients from '~/pages/Recipients';
import RecipientsForm from '~/pages/Recipients/Form';

import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" exact component={Delivery} isPrivate />
      <Route path="/deliveries/create" component={DeliveryForm} isPrivate />
      <Route path="/deliveries/update/:id" component={DeliveryForm} isPrivate />

      <Route path="/deliverymen" exact component={Deliveryman} isPrivate />
      <Route
        path="/deliverymen/create"
        exact
        component={DeliverymanForm}
        isPrivate
      />
      <Route
        path="/deliverymen/update/:id"
        component={DeliverymanForm}
        isPrivate
      />

      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/recipients/create" component={RecipientsForm} isPrivate />
      <Route
        path="/recipients/update/:id"
        component={RecipientsForm}
        isPrivate
      />

      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
