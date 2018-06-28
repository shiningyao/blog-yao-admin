import * as React from 'react';
import { Component } from "react";
import { Redirect } from 'react-router';
import { AuthServerProvider } from '@/shared/auth/auth-session';
import { LoginWrapper, LoginForm } from '@/shared/login/styles';
import Logo from '@/components/logo/logo.component';

interface LoginPageProps {
    [key: string]: any
}

interface LoginPageStates {
    credentials: {
        username: string,
        password: string,
        rememberMe: boolean
    }
}

export class LoginPage extends Component<LoginPageProps, LoginPageStates> {

    private authServerProvider: AuthServerProvider;

    constructor(props, context) {
        super(props, context);
        this.authServerProvider = new AuthServerProvider();
        this.state = {
            credentials: {
                username: '',
                password: '',
                rememberMe: false
            }
        };
        this.onCredentialsChange = this.onCredentialsChange.bind(this);
        this.onCredentialsChange = this.onCredentialsChange.bind(this);
        this.login = this.login.bind(this);
    }

    onCredentialsChange(event) {
        this.state.credentials[event.target.name] = event.target.value;
        this.setState(this.state);
    }

    login(event) {
        event.preventDefault();
        this.props.login(this.state.credentials, null);
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
                                    <LoginForm onSubmit={this.login}>
                                        <div className="login-logo">
                                            <a href="javascript: void(0)">
                                                <Logo width={25} height={25} fill="#303549"></Logo>
                                            </a>
                                            <a className="logo-text" href="javascript: void(0)">
                                                YAOSHEN
                                            </a>
                                        </div>
                                        <div className="auth-box">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <h3>Sign in</h3>
                                                </div>
                                            </div>
                                            <div className="input-group">
                                                <input onChange={this.onCredentialsChange} 
                                                    value={this.state.credentials.username}
                                                    name="username"
                                                    className="form-control" 
                                                    type="text" placeholder="Username or Email Address"
                                                    required />
                                            </div>
                                            <div className="input-group">
                                                <input onChange={this.onCredentialsChange} 
                                                    value={this.state.credentials.password}
                                                    name="password"
                                                    className="form-control" 
                                                    type="password" placeholder="Password"
                                                    required />
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="checkbox-fade">
                                                        <label>
                                                            <input type="checkbox" name="rememberMe" />
                                                            <span className="cr">
                                                                <i className="icofont icofont-ui-check"></i>
                                                            </span>
                                                            <span className="text-inverse">Remember me</span>
                                                        </label>
                                                    </div>
                                                    <div className="forgot-phone"></div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <button className="btn btn-primary btn-block">
                                                        Sign in
                                                    </button>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <p className="text-inverse">
                                                        Thank you and enjoy our website.
                                                    </p>
                                                    <p>
                                                        Your Authentication Team
                                                    </p>
                                                </div>
                                                <div className="col-sm-2">
                                                    Logo
                                                </div>
                                            </div>
                                        </div>
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