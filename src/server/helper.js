//app.use(webpackDevMiddleware(compiler))
//app.use(webpackHotMiddleware(compiler))

//import qs from 'qs';
//import { matchRoutes, renderRoutes } from 'react-router-config';

import fs from 'fs';
import path from 'path';
import serialize from 'serialize-javascript';

import React from 'react';
import { renderToString, renderToNodeStream } from 'react-dom/server';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { matchPath } from 'react-router';
import { StaticRouter } from 'react-router';

import rootReducer from '../common/lib/Redux/index';
import { DefaultLayout } from '../common/layouts';
//import App from '../client/App';

//import App from '../client/App';

export const handleRender = async (req, res) => {
    
    const store = createStore(rootReducer, applyMiddleware(thunk)); //reducer

    const context = {};
    const preloadedState = store.getState();

    //markup
    const html = 
    //renderToNodeStream(
    renderToString(
        <StaticRouter location={req.url} context={context}>
            <Provider store={store}>
                <DefaultLayout />
            </Provider>
        </StaticRouter>
       //<App />
    );

    console.log('Context===>', context, req.url);
    console.log('===>', matchPath(req.url, {
        path: '/detail/:id'
    }));// isExact, params

    if(context.status === 404) {
        return res.send(404);
    }

    if(context.url) {
        return res.redirect(301, context.url);
    }

    return res.send(renderFullPage({}, html, preloadedState));
    /*const indexFile = path.resolve('./dist/index.html');

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
    });*/
};

const renderFullPage = (indexData, html, preloadedState, routeData = {}) => {

    //<meta name="viewport" content="width=device-width, initial-scale=1" />
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>React Universal App</title>
            <link href="/static/css/style.css" rel="stylesheet">
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
            </script>
            <script src="/static/js/bundle.js"></script>
        </body>
        </html>
    `;

    /*
    return indeData.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
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
        )*/
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