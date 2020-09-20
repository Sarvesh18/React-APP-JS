import React from 'react';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './index';

const preloadedState = {};//window.__PRELOADED_STATE__;

//ROUTE_DATA

console.log('===>', window.__PRELOADED_STATE__);

//delete window.__PRELOADED_STATE__;

//middlewares
//push

const middlewares = [thunk];

process.env.DEBUG ? middlewares.push(logger) : null;

const store = createStore(reducers, preloadedState, applyMiddleware(...middlewares));

/**
 * @see
 * @param {*} props 
 */
const Redux = (props) => {

    return (
        <Provider store={store} >
            {props.children}
        </Provider>
    );
};

export default Redux;