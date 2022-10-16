import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { reducers } from './reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const store = createStore(
    reducers,
    composeEnhancer(applyMiddleware(thunk)),
);

const persistore = persistStore(store);

export { store, persistore };