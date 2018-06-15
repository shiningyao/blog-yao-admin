import '#/styles/scss/main.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@/layout/layout.component';

ReactDOM.render(
    <Router>
        <AppLayout compiler='typescript' framework='react'></AppLayout>
    </Router>,
    document.getElementById('blog-yao-admin')
);