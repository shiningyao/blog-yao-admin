import * as React from 'react';
import { Component } from "react";
import { authenticate } from '@/shared/actions';
import { Redirect } from 'react-router';
import { AuthServerProvider } from '@/shared/auth/auth-session';

interface LoginPageProps {
    [key: string]: any
}

export class LoginPage extends Component<LoginPageProps, {}> {

    private authServerProvider: AuthServerProvider;

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
                <button onClick={this.login.bind(this)}>Sign in{': ' + this.props.isAuthenticated}</button>
            );
        }
    }

    login() {
        this.authServerProvider.login({
            username: 'admin',
            password: 'admin',
            rememberMe: false
        }).subscribe(res => {
            console.log(res.data);
        });
    }
}