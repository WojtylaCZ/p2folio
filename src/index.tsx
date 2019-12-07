import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import App from './components/App';

ReactGA.initialize('UA-149846559-1');
ReactGA.pageview(window.location.pathname);

ReactDOM.render(<App />, document.getElementById('root'));
