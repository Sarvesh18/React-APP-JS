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

import defaultRoutes from '../common/layouts/DefaultLayout/DefaultLayout.route';
import DefaultLayout from '../common/layouts/DefaultLayout/DefaultLayout';


export const handleRender = async (req, res) => {
    
    let status = 200;

    const store = createStore(rootReducer, applyMiddleware(thunk));

    const matches = defaultRoutes.reduce((matches, route) => {
        const match = matchPath(req.url, {
            path: route.path
        });
        if(match && match.isExact) {
            matches.push({
                route,
                match,
                promise: route.component.fetchData ? route.component.fetchData({
                    store,
                    params: match.params
                }) : Promise.resolve(null)
            });
        }
        return matches;
    }, []);

    //404
    if(matches.length === 0) {
        status = 404;
    }

    const promises = matches.map((match) => {
        return match.promise;
    });

    Promise.all(promises).then((...data) => {

        const initialState = store.getState();
        const context = {};

        const html = renderToNodeStream(
            //renderToString(
            <StaticRouter location={req.url} context={context}>
                <Provider store={store}>
                    <DefaultLayout />
                </Provider>
            </StaticRouter>
        );


        if(context.status === 404) {
            return res.send(404);
        }
    
        if(context.url) {
            return res.redirect(301, context.url);
        }
        else {

            //const helmet = Helmet.renderStatic();

            return res.send(renderFullPage({}, html, initialState));
            //store.dispatch({
            //    type: 'RESET'
            //});
        }
    }, (error) => {
        console.log('error', error);
    });


    //const preloadedState = store.getState();
    /*const indexFile = path.resolve('./dist/index.html');
    fs.readFile(indexFile, 'utf8', (err, indexData) => {
        if(err) {
            return res.status(500).send('Oops, better luck next time!');
        };
    });*/
};

const renderFullPage = (indexData, html, preloadedState, routeData = {}) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
    
            <title>React Universal App</title>
            <link href="/static/css/style.css" rel="stylesheet">
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
            </script>
            <script src="/static/js/bundle.js?${Math.random()}"></script>
        </body>
        </html>
    `;

    /*
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
        )*/
};