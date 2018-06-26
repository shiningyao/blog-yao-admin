import * as React from 'react';
import { Component } from "react";
import { Redirect } from 'react-router';
import { AuthServerProvider } from '@/shared/auth/auth-session';

interface LoginPageProps {
    [key: string]: any
}

export class LoginPage extends Component<LoginPageProps, {}> {

    private authServerProvider: AuthServerProvider;
    private credentials = {
        username: 'admin',
        password: 'admin',
        rememberMe: false
    };

    constructor(props, context) {
        super(props, context);
        this.authServerProvider = new AuthServerProvider();
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        if(this.props.isAuthenticated) {
            return (
                <Redirect
                    to={from}></Redirect>
            );
        } else {
            return (
                <button onClick={this.props.login.bind(this, this.credentials)}>Sign in{': ' + this.props.isAuthenticated}</button>
            );
        }
    }

}