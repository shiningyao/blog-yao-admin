import * as authReducers from '@/shared/reducers/auth';
import * as localeReducers from '@/shared/reducers/locale';
import * as appReducer from '@/shared/reducers/app';
import { combineReducers } from 'redux';

const reducers = Object.assign(
    {}, 
    authReducers, 
    localeReducers,
    appReducer
);

export default combineReducers(reducers);