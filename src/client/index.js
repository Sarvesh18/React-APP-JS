import React from 'react';
import ReactDOM from 'react-dom';

//import * as Sentry from '@sentry/react';
//Sentry.init({
  //dsn: ''
//})

import { Redux, Router } from '@lib';
import { DefaultLayout } from '@layouts';

/**
 * @see https://reactjs.org/docs/react-dom.html#hydrate
 * //ReactDOM.render
 */
ReactDOM.hydrate(
  <React.StrictMode>
    <Redux>
      <Router>
        <DefaultLayout />
      </Router>
    </Redux>
  </React.StrictMode>,
	document.getElementById('root'),
);

//import * as serviceWorker from './serviceWorker';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
