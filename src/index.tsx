import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { BrowserRouter } from 'react-router-dom';

import './i18n';
import { Index } from './page/Index';

ReactGA.initialize('UA-149846559-1');
ReactGA.pageview(window.location.pathname);

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={null}>
      <Index />
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
);
