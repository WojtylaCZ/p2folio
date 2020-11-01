import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { login } from '../libs/authentication/Login.page';
import { registration } from '../libs/authentication/Registration.page';
import { ForexPage } from '../libs/forex/Forex.page';
import { PlatformPage } from '../libs/platform/Platform.page';
import { Portfolio } from '../libs/portfolio/Portfolio.page';

import App from './App';

export const Body = () => {
  return (
    <div>
      <Switch>
        <Route path="/login" component={login} exact={true} />
        <Route path="/register" component={registration} exact={true} />
        <Route path="/forex" component={ForexPage} exact={true} />
        <Route path="/platforms/:platformId" component={PlatformPage} />
        <Route path="/v1" component={App} />
        <Route path="/" component={Portfolio} />
      </Switch>
    </div>
  );
};
