//import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

//import * as Sentry from '@sentry/react';
//Sentry.init({
  //dsn: ''
//})

//import App from './App';

import { Router } from '@lib';
import { DefaultLayout } from '@layouts';
import Redux from '../common/lib/Redux/Redux';

/**
 * @see https://reactjs.org/docs/react-dom.html#hydrate
 * //ReactDOM.render
 */

console.log('===>', window.__PRELOADED_STATE__);

ReactDOM.hydrate(
  <React.StrictMode>
    <Router>
      <Redux>
        <DefaultLayout />
      </Redux>
    </Router>
  </React.StrictMode>,
	document.getElementById('root'),
);

//import * as serviceWorker from './serviceWorker';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
