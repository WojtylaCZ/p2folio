import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { login } from '../libs/authentication/login';
import { registration } from '../libs/authentication/registration';

import App from './App';

export const Body = () => {
  return (
    <div>
      <Switch>
        <Route path="/login" component={login} exact={true} />
        <Route path="/register" component={registration} exact={true} />
        <Route path="/" component={App} />
      </Switch>
    </div>
  );
};
