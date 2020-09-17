//import qs from 'qs';
//import { matchRoutes, renderRoutes } from 'react-router-config';
import fs from 'fs';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from 'react-router';

import serialize from 'serialize-javascript';

import { reducers } from '../common/lib';
import { DefaultLayout } from '../common/layouts';


export const handleRender = (req, res) => {
    
    const store = createStore(reducers); //reducer

    const context = {};
    const preloadedState = store.getState();

    const html = renderToString(
        <StaticRouter location={req.url} context={context}>
            <Provider store={store}>
                <DefaultLayout />
            </Provider>
        </StaticRouter>
    );

    const indexFile = path.resolve('./dist/index.html');


    fs.readFile(indexFile, 'utf8', (err, indexData) => {
        if(err) {
            return res.status(500).send('Oops, better luck next time!');
        };

        if(context.status === 404) {
            return res.send(404);
        }

        if(context.url) {
            return res.redirect(301, context.url);
        }

        return res.send(renderFullPage(indexData, html, preloadedState));
    });
};

const renderFullPage = (indexData, html, preloadedState, routeData = {}) => {
    return indexData.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        .replace(
            '</body>',
            `
                <script>
                    // WARNING: See the following for security issues around embedding JSON in HTML:
                    // https://redux.js.org/recipes/server-rendering/#security-considerations
                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
                        /</g,
                        '\\u003c'
                    )}
                </script>
                <script>window.__ROUTE_DATA__ = ${serialize(routeData)}</script>
            </body>`
        )
};

/*
@see https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
  const currentRoute =
    Routes.find(route => matchPath(req.url, route)) || {};
  let promise;

  if (currentRoute.loadData) {
    promise = currentRoute.loadData();
  } else {
    promise = Promise.resolve(null);
  }

  promise.then(data => {
    // Let's add the data to the context
    const context = { data };
*/