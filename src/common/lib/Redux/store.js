// TODO: To dynamic inject reducer;
import { createStore, combineReducers, applyMiddleware } from 'redux';

const staticReducers = {};

const createReducer = (asyncReducers) => {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers
    })
};

const configureStore = (initialState) => {
    
    const store = createStore(createReducer(), initialState);

    store.asyncReducers = {};

    //inject reducer
    store.injectReducer = (key, asyncReducer) => {
        store.asyncReducers[key] = asyncReducer;
        store.replaceReducer(createReducer(store.asyncReducers));
    };

    return store;
};

export default configureStore;
