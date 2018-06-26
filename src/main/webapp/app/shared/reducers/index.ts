import * as authReducers from './auth';
import { combineReducers } from 'redux';

const reducers = Object.assign({}, authReducers);

export default combineReducers(reducers);