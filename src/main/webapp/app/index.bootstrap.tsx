import '#/styles/scss/main.scss';

import './index.polyfills';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducers from './shared/reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@/layout/layout.component';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <AppLayout compiler='typescript' framework='react'></AppLayout>
        </Router>
    </Provider>,
    document.getElementById('blog-yao-admin')
);