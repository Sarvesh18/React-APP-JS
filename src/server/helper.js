import qs from 'qs';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import App from '';

const handleRender = (req, res) => {
    
    //'./api/counter'


    //const params = qs.parse(req.query);
    //const params = parseInt(params.counter, 10) || 0;


    const store = createStore({}); //reducer

    const html = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );

    const preloadedState = store.getState();

    //finalState

    res.send(renderFullPage(html, preloadedState)); //{counter}
};

const renderFullPage = (html, preloadedState) => {
    return `
        <!doctype html>
        <html>
        <head>
            <title>Redux Universal Example</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // https://redux.js.org/recipes/server-rendering/#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
                /</g,
                '\\u003c'
            )}
            </script>
            <script src="/static/bundle.js"></script>
        </body>
        </html>
    `
}