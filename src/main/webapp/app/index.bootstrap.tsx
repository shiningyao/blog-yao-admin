import '#/styles/scss/main.scss';

import './index.polyfills';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducers from './shared/reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@/layout/layout.component';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logoText = require('raw-loader!../../resources/banner.txt').replace(/(\$\{.*?\})/g, '').replace(/Running Spring Boot/g, 'Authored By Shining Yao');

const middlewares = [
    thunkMiddleware
];

if(process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
}

const store = createStore(
    reducers,
    applyMiddleware(...middlewares)
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <AppLayout compiler='typescript' framework='react'></AppLayout>
        </Router>
    </Provider>,
    document.getElementById('blog-yao-admin'),
    () => {
        console.log(`%c${logoText}`, `color: #fc6180`);
    }
);