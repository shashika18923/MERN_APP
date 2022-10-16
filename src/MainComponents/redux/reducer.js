import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer } from './userReducer';

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: ['user']
};

export const reducers = persistReducer(rootPersistConfig, combineReducers({
    user: userReducer,
}));