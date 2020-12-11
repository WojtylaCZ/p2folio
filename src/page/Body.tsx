import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from '../componentsV1/App';
import { LoginPage } from '../libs/authentication/Login.page';
import { SignUpPage } from '../libs/authentication/SignUp.page';
import { ForexPage } from '../libs/forex/Forex.page';
import { PlatformPage } from '../libs/platform/Platform.page';
import { Portfolio } from '../libs/portfolio/Portfolio.page';

export const Body = () => {
  return (
    <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
      <Switch>
        <Route path="/login" component={LoginPage} exact={true} />
        <Route path="/signup" component={SignUpPage} exact={true} />
        <Route path="/forex" component={ForexPage} exact={true} />
        <Route path="/platforms/:platformId" component={PlatformPage} />
        <Route path="/v1" component={App} />
        <Route path="/" component={Portfolio} />
      </Switch>
    </div>
  );
};
