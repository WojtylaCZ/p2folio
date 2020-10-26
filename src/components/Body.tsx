import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { login } from '../libs/authentication/login';
import { registration } from '../libs/authentication/registration';
import { forex } from '../libs/foreign_exchange/forex';
import { Homepage } from '../libs/homepage/Homepage';

import App from './App';

export const Body = () => {
  return (
    <div>
      <Switch>
        <Route path="/login" component={login} exact={true} />
        <Route path="/register" component={registration} exact={true} />
        <Route path="/forex" component={forex} exact={true} />
        <Route path="/v1" component={App} />
        <Route path="/" component={Homepage} />
      </Switch>
    </div>
  );
};
