import * as authReducers from './auth';
import * as localeReducers from './locale';
import * as appReducer from './app';
import { combineReducers } from 'redux';

const reducers = Object.assign(
    {}, 
    authReducers, 
    localeReducers,
    appReducer
);

export default combineReducers(reducers);