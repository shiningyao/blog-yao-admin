import * as React from 'react';
import { Component } from "react";
import { Redirect } from 'react-router';
import { AuthServerProvider } from '@/shared/auth/auth-session';
import { LoginWrapper, LoginForm } from '@/shared/login/styles';
import Logo from '@/components/logo/logo.component';

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
                <LoginWrapper>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="login-card">
                                    <LoginForm>
                                        <div className="login-logo">
                                            <a href="javascript: void(0)">
                                                <Logo width={25} height={25} fill="#303549"></Logo>
                                            </a>
                                            <a className="logo-text" href="javascript: void(0)">
                                                YAOSHEN
                                            </a>
                                        </div>
                                        <button type="button" onClick={this.props.login.bind(this, this.credentials, null)}>Sign in{': ' + this.props.isAuthenticated}</button>
                                    </LoginForm>
                                </div>
                            </div>
                        </div>
                    </div>
                </LoginWrapper>
            );
        }
    }

}