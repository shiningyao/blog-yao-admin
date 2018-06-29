import * as authReducers from './auth';
import * as localeReducers from './locale';
import { combineReducers } from 'redux';

const reducers = Object.assign({}, authReducers, localeReducers);

export default combineReducers(reducers);