import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { login } from '../libs/authentication/login';
import { registration } from '../libs/authentication/registration';
import { ForexPage } from '../libs/forex/Forex.page';
import { Homepage } from '../libs/homepage/Homepage';

import App from './App';

export const Body = () => {
  return (
    <div>
      <Switch>
        <Route path="/login" component={login} exact={true} />
        <Route path="/register" component={registration} exact={true} />
        <Route path="/forex" component={ForexPage} exact={true} />
        <Route path="/v1" component={App} />
        <Route path="/" component={Homepage} />
      </Switch>
    </div>
  );
};
