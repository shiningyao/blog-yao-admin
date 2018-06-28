import * as React from 'react';
import { Component } from "react";
import { Route } from 'react-router';
import LoginPage from '@/shared/login/login.container';
import PrivateRoute from '@/shared/auth/route/private-route';
import AppLayout from '@/layout/layout.component';

export interface AppProps {
    compiler: string,
    framework: string,
    [key: string]: any
};

export class BlogApp extends Component<AppProps, {}> {
    render() {
        return (
            <Route path="*" render={
                props => {
                    if(props.match.url === '/login') {
                        return (
                            <LoginPage {...props}></LoginPage>
                        );
                    } else {
                        return (
                            <PrivateRoute {...props} component={AppLayout} />
                        );
                    }
                }
            }>
            </Route>
        )
    }
}