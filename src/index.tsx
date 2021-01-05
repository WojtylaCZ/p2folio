import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { BrowserRouter, useLocation } from 'react-router-dom';

import './i18n';
import { Index } from './page/Index';

ReactGA.initialize('UA-149846559-1');
ReactGA.pageview(window.location.pathname);

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={null}>
      <ScrollToTop />
      <Index />
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
);
