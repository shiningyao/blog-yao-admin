import '#/styles/scss/main.scss';

import { polyfillLoader } from './index.polyfills';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducers from './shared/reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import BlogApp from '@/app.container';

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

polyfillLoader.then(function() {

    ReactDOM.render(
        <Provider store={store}>
            <BlogApp compiler='typescript' framework='react'></BlogApp>
        </Provider>,
        document.getElementById('blog-yao-admin'),
        () => {
            console.log(`%c${logoText}`, `color: #fc6180`);
        }
    );
});