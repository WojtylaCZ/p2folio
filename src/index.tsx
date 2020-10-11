import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import { Index } from './components/Index';

ReactGA.initialize('UA-149846559-1');
ReactGA.pageview(window.location.pathname);

ReactDOM.render(
  <BrowserRouter>
    <Index />
  </BrowserRouter>,
  document.getElementById('root')
);
